import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';
import * as Forms from '@reactodia/workspace/forms';
import * as N3 from 'n3';

import { GenealogicalPropertyEditor } from './FormInputs';
import {
  GenealogicalDataProvider, GenealogicalLocaleProvider, findGenealogicalProvider,
} from './GenealogicalDataProvider';
import { GenealogicalMetadataProvider } from './GenealogicalMetadataProvider';
import { GenealogicalPackage } from './GenealogicalPackage';
import { GenealogicalValidationProvider } from './GenealogicalValidationProvider';
import {
  PersonTemplate, MarriageTemplate,
  ParentLinkTemplate, HasPartnerLinkTemplate, RelatedToLinkTemplate, OtherLinkTemplate,
} from './GraphTemplates';
import { MainMenu } from './MainMenu';
import { OpenPackageSettings } from './OpenPackageSettings';
import { sh, getSinglePropertyValue, termAsString } from './OwlShaclSchema';
import { genealogy, schema } from './Vocabularies';

import enTranslation from './translations/en.translation.json';
import GenealogicalSchemaTurtle from './GenealogicalSchema.ttl?raw';
import styles from './GenealogicalTree.module.css';

const PERSON_ICON: string = require('!!url-loader!@vscode/codicons/src/icons/person.svg').default;

const Layouts = Reactodia.defineLayoutWorker(() => new Worker(
  new URL('@reactodia/workspace/layout.worker', import.meta.url)
));

interface DataSource {
  readonly bytes: Uint8Array;
}

export function ToolGenealogicalTree() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const [schemaProvider] = React.useState(() => {
    const provider = new (class extends Reactodia.RdfDataProvider {
      override async knownElementTypes(params: { signal?: AbortSignal; }): Promise<Reactodia.ElementTypeGraph> {
        const graph = await super.knownElementTypes(params);
        return {
          ...graph,
          elementTypes: graph.elementTypes.filter(data => !(
            data.id.startsWith(Reactodia.owl.$namespace) ||
            data.id.startsWith(Reactodia.rdfs.$namespace) ||
            data.id.startsWith(sh.$namespace)
          )),
        };
      }
    })();
    try {
      provider.addGraph(new N3.Parser().parse(GenealogicalSchemaTurtle));
    } catch (err) {
      throw new Error('Failed to parse OWL-SHACL schema for the editor', {cause: err});
    }
    return provider;
  });

  const [workspace] = React.useState(() => Reactodia.createWorkspace({
    defaultLayout,
    translation: new Reactodia.DefaultTranslation({
      bundles: [
        {
          ...enTranslation,
          'visual_authoring': {
            'property.load_error.text': '⚠ Failed to load variants',
          },
        },
        Reactodia.DefaultTranslationBundle,
      ],
    }),
    metadataProvider: new GenealogicalMetadataProvider({
      schemaProvider,
      defaultNamespaceBase: GenealogicalPackage.DEFAULT_NAMESPACE_BASE,
    }),
    validationProvider: new GenealogicalValidationProvider(),
    renameLinkProvider: new RenameGenealogicalLinksProvider(),
    typeStyleResolver: types => {
      if (types.includes(schema.Male)) {
        return {color: '#01baef', icon: PERSON_ICON, iconMonochrome: true};
      } else if (types.includes(schema.Female)) {
        return {color: '#f48da7ff', icon: PERSON_ICON, iconMonochrome: true};
      } else if (types.includes(schema.Person)) {
        return {color: '#b5d2cb', icon: PERSON_ICON, iconMonochrome: true};
      }
    },
  }));

  const [dataSource, setDataSource] = React.useState<DataSource>();

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    const {model, view, editor, overlay, translation: t, getCommandBus, performLayout} = context;
    const metadataProvider = editor.metadataProvider as GenealogicalMetadataProvider;
    const validationProvider = editor.validationProvider as GenealogicalValidationProvider;
    const renameLinkProvider = view.renameLinkProvider as RenameGenealogicalLinksProvider;

    metadataProvider.loadSchema({signal});
    editor.setAuthoringState(Reactodia.AuthoringState.empty);
    editor.setAuthoringMode(true);

    const listener = new Reactodia.EventObserver();
    listener.listen(editor.events, 'changeAuthoringState', () => {
      metadataProvider.updateSettings(editor.authoringState);
    });
    signal.addEventListener('abort', () => listener.stopListening());

    let sourcePackage: GenealogicalPackage;
    if (dataSource) {
      try {
        sourcePackage = await GenealogicalPackage.loadFromBytes(dataSource.bytes, {signal});
      } catch (err) {
        throw new Error(t.text('genealogical_tree.init_failed_to_load_package'), {cause: err});
      }
    } else {
      sourcePackage = GenealogicalPackage.createEmpty();
    }

    const uploader = new Forms.MemoryFileUploader({
      factory: Reactodia.Rdf.DefaultDataFactory,
      disposeSignal: signal,
    });
    const mainProvider = new GenealogicalDataProvider(sourcePackage, {uploader, signal});
    const dataProvider = new Reactodia.CompositeDataProvider({
      providers: [
        {
          provider: schemaProvider,
          origin: schemaProvider.factory.namedNode(genealogy.SchemaOrigin),
        },
        {
          provider: mainProvider,
          origin: mainProvider.factory.namedNode(genealogy.DataOrigin),
        },
      ],
    });

    await metadataProvider.loadSettings({mainProvider, signal});
    metadataProvider.updateSettings(editor.authoringState);
    validationProvider.setProvider(mainProvider);
    renameLinkProvider.setWorkspace(workspace);

    const initialSettings = metadataProvider.getSettings();
    const defaultLanguage = termAsString(getSinglePropertyValue(
      initialSettings, genealogy.defaultLanguage
    ));
    if (defaultLanguage) {
      model.setLanguage(defaultLanguage);
    }

    const locale = new GenealogicalLocaleProvider({
      model,
      translation: t,
      uploader: mainProvider.uploader,
      package: sourcePackage,
    });
    await model.importLayout({
      dataProvider,
      locale,
      diagram: sourcePackage.diagrams.get('urn:reactodia:genealogical-package:diagram:main'),
      validateLinks: true,
      signal,
    });

    if (sourcePackage.diagrams.size === 0) {
      const task = overlay.startTask();
      try {
        await Promise.all([schema.Person, genealogy.Marriage, schema.Place].map(async (type) => {
          const items = await mainProvider.lookup({elementTypeId: type});
          for (const {element} of items) {
            model.createElement(element.id);
          }
        }));
        await model.requestData();
        await performLayout({signal});
      } catch (error) {
        task.setError(error);
      } finally {
        task.end();
      }

      if (model.elements.length === 0) {
        getCommandBus(Reactodia.UnifiedSearchTopic)
          .trigger('focus', { sectionKey: 'elementTypes' });
      }
    }

    const allEntities = new Set<Reactodia.ElementIri>();
    for (const element of model.elements) {
      for (const entity of Reactodia.iterateEntitiesOf(element)) {
        allEntities.add(entity.id);
      }
    }
    editor.revalidateEntities(allEntities);
  }, [dataSource]);

  return (
    <Reactodia.WorkspaceProvider workspace={workspace}
      onMount={onMount}>
      <Reactodia.DefaultWorkspace
        className={styles.workspace}
        menu={
          <>
            <MainMenu
              onOpen={bytes => setDataSource({bytes})}
              onSave={async () => {
                const {model, editor} = workspace;
                const mainProvider = findGenealogicalProvider(model.dataProvider);

                // Capture authoring state before finalizing the diagram
                const authoringState = editor.authoringState;
                editor.applyAuthoringChanges();

                const updatedPackage = await mainProvider.sourcePackage.exportWith({
                  dataProvider: mainProvider,
                  authoringState: mainProvider.cleanupAuthoring(authoringState),
                  diagrams: new Map([
                    ['main', model.exportLayout()]
                  ]),
                  uploader: mainProvider.uploader,
                });
                setDataSource({bytes: await updatedPackage.bytes()});
                return updatedPackage;
              }}
            />
          </>
        }
        canvas={{
          elementTemplateResolver: types => {
            if (types.includes(schema.Person)) {
              return PersonTemplate;
            } else if (types.includes(genealogy.Marriage)) {
              return MarriageTemplate;
            }
          },
          linkTemplateResolver: type => {
            if (type === schema.parent) {
              return ParentLinkTemplate;
            } else if (type === schema.relatedTo) {
              return RelatedToLinkTemplate;
            } else if (type === genealogy.hasPartner) {
              return HasPartnerLinkTemplate;
            } else if (type) {
              return OtherLinkTemplate;
            }
          },
        }}
        languages={[
          { code: 'de', label: 'Deutsch' },
          { code: 'en', label: 'english' },
          { code: 'es', label: 'español' },
          { code: 'ru', label: 'русский' },
          { code: 'zh', label: '汉语' },
        ]}
        visualAuthoring={{
          propertyEditor: options => <GenealogicalPropertyEditor options={options} />,
        }}>
        <Reactodia.Toolbar dock='ne'>
          <OpenPackageSettings />
        </Reactodia.Toolbar>
      </Reactodia.DefaultWorkspace>
    </Reactodia.WorkspaceProvider>
  );
}

class RenameGenealogicalLinksProvider extends Reactodia.RenameLinkToLinkStateProvider {
  private workspace: Reactodia.WorkspaceContext | undefined;

  setWorkspace(context: Reactodia.WorkspaceContext | undefined) {
    this.workspace = context;
  }

  override canRename(link: Reactodia.Link): boolean {
    return (
      link instanceof Reactodia.AnnotationLink ||
      link.typeId === schema.relatedTo
    );
  }

  getLabel(link: Reactodia.Link): string | undefined {
    if (link instanceof Reactodia.RelationLink && link.data.linkTypeId === schema.relatedTo) {
      if (!this.workspace) {
        return undefined;
      }
      const {model, editor, translation: t} = this.workspace;
      const event = editor.authoringState?.links.get(link.data);
      const data = event?.data ?? link.data;
      const labels = data.properties[Reactodia.rdfs.label];
      if (labels) {
        const literals = labels.filter(v => v.termType === 'Literal');
        if (literals.length > 0) {
          return t.formatLabel(literals, '', model.language);
        }
      }
    } else {
      return super.getLabel(link);
    }
  }

  setLabel(link: Reactodia.Link, label: string): void {
    if (link instanceof Reactodia.RelationLink && link.data.linkTypeId === schema.relatedTo) {
      if (!this.workspace) {
        return;
      }
      const {model, editor, translation: t} = this.workspace;
      const event = editor.authoringState?.links.get(link.data);
      const data = event?.data ?? link.data;
      const labels = data.properties[Reactodia.rdfs.label] ?? [];
      const previous = this.getLabel(link);
      const current = t.selectLabel(
        labels
          .filter(v => v.value === previous)
          .filter(v => v.termType === 'Literal'),
        model.language
      );
      editor.changeRelation(data, {
        ...data,
        properties: {
          [Reactodia.rdfs.label]: [
            ...labels.filter(v => v !== current),
            model.factory.literal(label, current?.language)
          ]
        }
      });
    } else {
      return super.setLabel(link, label);
    }
  }
}
