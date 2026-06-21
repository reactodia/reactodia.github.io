import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';
import * as Forms from '@reactodia/workspace/forms';

import { findGenealogicalProvider } from './GenealogicalDataProvider';
import { genealogy, rdfs, schema, xsd } from './Vocabularies';

import styles from './FormInputs.module.css';

export function GenealogicalPropertyEditor(props: {
    options: Reactodia.PropertyEditorOptions;
}) {
  const {options} = props;
  return (
    <Reactodia.DefaultPropertyEditor options={options}
      resolveInput={(property, inputProps) => {
        if (property === rdfs.comment) {
          return <Forms.InputList {...inputProps} valueInput={MultilineTextInput} />;
        } else if (property === schema.gender) {
          return <Forms.InputList {...inputProps} valueInput={InputGender} />;
        } else if (property === Reactodia.schema.thumbnailUrl) {
          return <InputImage {...inputProps} />;
        } else if (
          property === genealogy.fromExMarriage ||
          property === genealogy.isDeceased
        ) {
          return <InputCheck {...inputProps} />;
        }
        return <Forms.InputList {...inputProps} valueInput={Forms.InputText} />;
      }}
    />
  );
}

function InputGender(props: Forms.InputSingleProps) {
  const {factory} = props;
  const {model} = Reactodia.useWorkspace();

  let provider: Reactodia.DataProvider | undefined;
  if (model.dataProvider instanceof Reactodia.CompositeDataProvider) {
    provider = model.dataProvider.providers
      .find(p => p.origin?.value === genealogy.SchemaOrigin)?.provider;
  }

  const {data: entities} = Reactodia.useProvidedEntities(provider, [schema.Male, schema.Female]);
  const language = Reactodia.useObservedProperty(
    model.events, 'changeLanguage', () => model.language
  );
  const variants = React.useMemo(
    () => Array.from(entities.values(), (item): Forms.InputSelectVariant => ({
      value: factory.namedNode(item.id),
      label: model.locale.formatEntityLabel(item, language),
    })),
    [entities, language, factory]
  );

  return (
    <Forms.InputSelect {...props} variants={variants} />
  );
}

function InputImage(props: Forms.InputMultiProps) {
  const {values} = props;
  const {model} = Reactodia.useWorkspace();
  const mainProvider = findGenealogicalProvider(model.dataProvider);
  if (!mainProvider) {
    throw new Error('Failed to find main provider');
  }
  const {data: fileMetadata} = Reactodia.useProvidedEntities(
    mainProvider,
    values.filter(v => v.termType === 'NamedNode').map(v => v.value)
  );
  return (
    <Forms.InputFile {...props}
      uploader={mainProvider.uploader}
      fileAccept='.jpg,.jpeg,.png,.svg,.gif'
      fileMetadata={fileMetadata}
      allowDrop={item => /^image\//.test(item.type)}
    />
  );
}

function InputCheck(props: Forms.InputMultiProps) {
  const {readonly, factory, values, updateValues} = props;
  const unchecked = values.every(v => (
    v.termType === 'Literal' &&
    v.datatype.value === xsd.boolean &&
    v.value === 'false'
  ));
  return (
    <input className={styles.inputCheck}
      type='checkbox'
      disabled={readonly}
      checked={!unchecked}
      onChange={e => {
        const nextChecked = e.currentTarget.checked;
        updateValues(() =>
          nextChecked
            ? [factory.literal('true', factory.namedNode(xsd.boolean))]
            : []
        );
      }}
    />
  );
}

function MultilineTextInput(props: Forms.InputSingleProps) {
  return <Forms.InputText {...props} multiline />;
}
