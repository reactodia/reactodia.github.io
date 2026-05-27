import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';

import styles from './GraphTemplates.module.css';
import { schema } from './Vocabularies';

export const MarriageTemplate: Reactodia.ElementTemplate = {
  shape: 'ellipse',
  renderElement: props => (
    props.element instanceof Reactodia.EntityElement
      ? <MarriageEntity {...props} target={props.element} />
      : null
  ),
};

function MarriageEntity(props: Reactodia.TemplateProps & { target: Reactodia.EntityElement }) {
  const {target} = props;
  const {model} = Reactodia.useWorkspace();
  const data = Reactodia.useObservedProperty(target.events, 'changeData', () => target.data);
  const language = Reactodia.useObservedProperty(model.events, 'changeLanguage', () => model.language);
  const label = model.locale.formatEntityLabel(data, language);
  return (
    <>
      <div className={styles.marriage} />
      <Reactodia.ElementDecoration target={target}>
        <div data-element-id={target.id}
          className={styles.marriageInfo}
          title={label}>
          {label}
        </div>
      </Reactodia.ElementDecoration>
    </>
  );
}

export const ParentLinkTemplate: Reactodia.LinkTemplate = {
  ...Reactodia.StandardLinkTemplate,
  markerTarget: {
    ...Reactodia.LinkMarkerArrowhead,
    stroke: 'context-stroke',
  },
  renderLink: props => (
    <Reactodia.StandardRelation {...props}
      pathProps={{
        stroke: '#747da8',
        strokeWidth: 3,
      }}
      primaryLabelProps={{
        style: {color: '#747da8'},
      }}
      propertyLabelProps={
        propertyIri => propertyIri === 'urn:reactodia:sourceProvider' ? null : undefined
      }
    />
  ),
};

export const OtherLinkTemplate: Reactodia.LinkTemplate = {
  ...Reactodia.StandardLinkTemplate,
  renderLink: props => (
    <Reactodia.StandardRelation {...props}
      pathProps={{
        stroke: 'var(--reactodia-color-emphasis-600)',
        strokeDasharray: props.link.typeId === schema.relatedTo ? '10 10' : undefined,
      }}
      primaryLabelProps={{
        style: {color: 'var(--reactodia-color-emphasis-600)'},
      }}
      propertyLabelProps={
        propertyIri => propertyIri === 'urn:reactodia:sourceProvider' ? null : undefined
      }
    />
  ),
};
