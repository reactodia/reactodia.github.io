import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';

import styles from './GraphTemplates.module.css';

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
