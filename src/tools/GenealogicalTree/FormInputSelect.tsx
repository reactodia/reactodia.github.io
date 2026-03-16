import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';

import { useLoadedEntities } from './useLoadedEntities';

export interface FormInputSelectProps extends Reactodia.FormInputSingleProps {
  provider?: Reactodia.DataProvider;
  variants: ReadonlyArray<Reactodia.Rdf.NamedNode | Reactodia.Rdf.Literal>;
}

// TODO: move to Reactodia
export function FormInputSelect(props: FormInputSelectProps) {
  const {model, translation: t} = Reactodia.useWorkspace();
  const variantIris = React.useMemo(
    () => props.variants.filter(v => v.termType === 'NamedNode').map(v => v.value),
    [props.variants]
  );
  const {entities: variantEntities, error: loadError} = useLoadedEntities(
    props.provider ?? model.dataProvider,
    variantIris
  );
  React.useEffect(() => {
    if (props.value.value === '' && props.variants.length > 0) {
      props.setValue(props.variants[0]);
    }
  }, []);
  return (
    <>
      <select className='reactodia-form-control'
        value={props.value.value}
        onChange={e => {
          const nextValue = e.currentTarget.value;
          const variant = props.variants.find(v => v.value === nextValue);
          if (variant) {
            props.setValue(variant);
          }
        }}>
        {props.variants.map(v => {
          let label = v.value;
          if (v.termType === 'NamedNode') {
            const entity = variantEntities.get(v.value);
            if (entity) {
              label = model.locale.formatEntityLabel(entity, model.language);
            }
          }
          return <option key={v.value} value={v.value}>{label}</option>;
        })}
      </select>
      {/* TODO: add validation to elements */}
      {loadError ? (
        <div style={{color: 'var(--reactodia-color-danger)'}}>
          {t.text('property.load_error.text')}
        </div>
      ) : null}
    </>
  );
}
