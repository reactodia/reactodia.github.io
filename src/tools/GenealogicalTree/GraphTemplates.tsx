import cx from 'clsx';
import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';

import styles from './GraphTemplates.module.css';
import { getSinglePropertyValue, termAsBoolean } from './OwlShaclSchema';
import { genealogy, schema } from './Vocabularies';

export const PersonTemplate: Reactodia.ElementTemplate = {
  ...Reactodia.StandardTemplate,
  renderElement: props => (
    props.element instanceof Reactodia.EntityElement
      ? <PersonEntity {...props} target={props.element} />
      : null
  ),
};

function PersonEntity(props: Reactodia.TemplateProps & { target: Reactodia.EntityElement }) {
  const {target} = props;
  const data = Reactodia.useObservedProperty(target.events, 'changeData', () => target.data);
  const deathDate = getSinglePropertyValue(data, schema.deathDate);
  const deceased = (
    Boolean(deathDate) || termAsBoolean(getSinglePropertyValue(data, genealogy.isDeceased))
  );
  return (
    <div className={cx(styles.person, deceased ? styles.personDeceased : undefined)}>
      <Reactodia.StandardEntity {...props} />
    </div>
  );
}

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
  const endDate = getSinglePropertyValue(data, schema.endDate);
  return (
    <>
      <div className={cx(styles.marriage, endDate ? styles.marriageEnded : undefined)} />
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

export const HasPartnerLinkTemplate: Reactodia.LinkTemplate = {
  ...Reactodia.StandardLinkTemplate,
  renderLink: props => {
    const {link} = props;
    const relation = link instanceof Reactodia.RelationLink ? link : undefined;
    const fromExMarriage = Reactodia.useSyncStore(
      Reactodia.useEventStore(relation?.events, 'changeData'),
      () => relation
        ? termAsBoolean(getSinglePropertyValue(relation.data, genealogy.fromExMarriage))
        : undefined
    );
    return (
      <Reactodia.StandardRelation {...props}
        pathProps={{
          stroke: 'var(--reactodia-color-primary-light)',
          strokeDasharray: fromExMarriage ? '10 5' : undefined,
        }}
        primaryLabelProps={{
          style: {color: 'var(--reactodia-color-emphasis-600)'},
        }}
        propertyLabelProps={
          propertyIri => (
            propertyIri === 'urn:reactodia:sourceProvider' ||
            propertyIri === genealogy.fromExMarriage
          ) ? null : undefined
        }
      />
    );
  },
};

export const RelatedToLinkTemplate: Reactodia.LinkTemplate = {
  ...Reactodia.StandardLinkTemplate,
  renderLink: props => (
    <Reactodia.StandardRelation {...props}
      pathProps={{
        stroke: 'var(--reactodia-color-emphasis-600)',
        strokeDasharray: '10 10',
      }}
      primaryLabelProps={{
        style: {color: 'var(--reactodia-color-emphasis-600)'},
      }}
      propertyLabelProps={
        propertyIri => (
          propertyIri === 'urn:reactodia:sourceProvider' ||
          propertyIri === Reactodia.rdfs.label
        ) ? null : undefined
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
