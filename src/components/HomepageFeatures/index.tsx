import * as React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  imageLightUrl: string;
  imageDarkUrl: string;
  description: React.JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Customizable Graph Navigator',
    imageLightUrl: require('@site/static/img/feature-diagram-light.png').default,
    imageDarkUrl: require('@site/static/img/feature-diagram-dark.png').default,
    description: (
      <>
        Extend or customize graph workspace with React components.
        Reactodia supports custom element or link components, additional
        canvas widgets, extendable selection actions and more.
      </>
    ),
  },
  {
    title: 'Built-in Interaction Widgets',
    imageLightUrl: require('@site/static/img/feature-interaction-light.png').default,
    imageDarkUrl: require('@site/static/img/feature-interaction-dark.png').default,
    description: (
      <>
        Reactodia was designed to have "batteries included" and contains
        powerful built-in components for graph exploration, selection,
        multi-touch support, export to image or document to print.
      </>
    ),
  },
  {
    title: 'Visual Graph Editing',
    imageLightUrl: require('@site/static/img/feature-authoring-light.png').default,
    imageDarkUrl: require('@site/static/img/feature-authoring-dark.png').default,
    description: (
      <>
        Edit graph data visually &mdash; create new entities, connect
        existing ones with links, edit properties on any graph element.
        Visual graph authoring is a unique and powerful way to manipulate
        interconnected data emphasizing its natural many-to-many relations.
      </>
    ),
  },
];

function Feature({ title, imageLightUrl, imageDarkUrl, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={imageLightUrl} className={styles.featureImageLight} />
        <img src={imageDarkUrl} className={styles.featureImageDark} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
