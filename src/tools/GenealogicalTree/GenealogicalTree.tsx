import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';
import * as Forms from '@reactodia/workspace/forms';
import * as N3 from 'n3';

import { GenealogicalMetadataProvider } from './GenealogicalMetadataProvider';
import { GenealogicalPackage } from './GenealogicalPackage';
import { GenealogicalValidationProvider } from './GenealogicalValidationProvider';
import { MarriageTemplate } from './GraphTemplates';
import { MainMenu } from './MainMenu';
import { OpenPackageSettings } from './OpenPackageSettings';
import { sh, getSinglePropertyValue, termAsString } from './OwlShaclSchema';
import { genealogy, rdfs, schema } from './Vocabularies';

import enTranslation from './translations/en.translation.json';
import GenealogicalSchemaTurtle from './GenealogicalSchema.ttl?raw';
import styles from './GenealogicalTree.module.css';

const Layouts = Reactodia.defineLayoutWorker(() => new Worker(
  new URL('@reactodia/workspace/layout.worker', import.meta.url)
));

interface DataSource {
  readonly bytes: Uint8Array;
}

export function PlaygroundGenealogicalTree() {
  const {defaultLayout} = Reactodia.useWorker(Layouts);

  const [dataSource, setDataSource] = React.useState<DataSource>();

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
  const [metadataProvider] = React.useState(() => new GenealogicalMetadataProvider({
    schemaProvider,
    defaultNamespaceBase: GenealogicalPackage.DEFAULT_NAMESPACE_BASE,
  }));
  const [validationProvider] = React.useState(() => new GenealogicalValidationProvider());
  const [renameLinkProvider] = React.useState(() => new RenameGenealogicalLinksProvider());

  const {onMount, getContext} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    const {model, editor, overlay, translation: t, getCommandBus, performLayout} = context;

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
      diagram: sourcePackage.diagram,
      validateLinks: true,
      signal,
    });

    if (!sourcePackage.diagram) {
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
    <Reactodia.Workspace ref={onMount}
      defaultLayout={defaultLayout}
      metadataProvider={metadataProvider}
      validationProvider={validationProvider}
      renameLinkProvider={renameLinkProvider}
      translations={[
        {
          ...enTranslation,
          'visual_authoring': {
            'property.load_error.text': '⚠ Failed to load variants',
          },
        }
      ]}>
      <Reactodia.DefaultWorkspace
        className={styles.workspace}
        menu={
          <>
            <MainMenu
              onOpen={bytes => setDataSource({bytes})}
              onSave={async () => {
                const {model, editor} = getContext();
                const mainProvider = findGenealogicalProvider(model.dataProvider);

                // Capture authoring state before finalizing the diagram
                const authoringState = editor.authoringState;
                editor.applyAuthoringChanges();

                const updatedPackage = await mainProvider.sourcePackage.exportWith({
                  dataProvider: mainProvider,
                  authoringState,
                  diagram: model.exportLayout(),
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
            if (types.includes(genealogy.Marriage)) {
              return MarriageTemplate;
            }
          },
          linkTemplateResolver: type => {
            if (type === schema.parent) {
              return ParentLinkTemplate;
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
          propertyEditor: options => (
            <Reactodia.DefaultPropertyEditor options={options}
              resolveInput={(property, inputProps) => {
                if (property === rdfs.comment) {
                  return <Forms.InputList {...inputProps} valueInput={MultilineTextInput} />;
                } else if (property === schema.gender) {
                  return <Forms.InputList {...inputProps} valueInput={FormInputSex} />;
                } else if (property === Reactodia.schema.thumbnailUrl) {
                  return <FormInputImage {...inputProps} />;
                }
                return <Forms.InputList {...inputProps} valueInput={Forms.InputText} />;
              }}
            />
          ),
        }}>
        <Reactodia.Toolbar dock='ne'>
          <OpenPackageSettings />
        </Reactodia.Toolbar>
      </Reactodia.DefaultWorkspace>
    </Reactodia.Workspace>
  );
}

class GenealogicalDataProvider extends Reactodia.RdfDataProvider {
  readonly uploader: Forms.MemoryFileUploader;

  private _dataset = Reactodia.indexedDataset(
    Reactodia.IndexQuadBy.SP
  );

  constructor(
    readonly sourcePackage: GenealogicalPackage,
    options: {
      uploader: Forms.MemoryFileUploader;
      signal: AbortSignal;
    }
  ) {
    super({
      datatypePredicates: [schema.gender, Reactodia.schema.thumbnailUrl],
    });
    const {uploader} = options;
    this.uploader = uploader;
    this.addGraph(sourcePackage.graph);
    this._dataset.addAll(sourcePackage.graph);
  }
}

class GenealogicalLocaleProvider extends Reactodia.DefaultDataLocaleProvider {
  private readonly uploader: Forms.MemoryFileUploader;
  private readonly package: GenealogicalPackage;

  constructor(options: Reactodia.DefaultDataLocaleProviderOptions & {
    uploader: Forms.MemoryFileUploader;
    package: GenealogicalPackage;
  }) {
    super(options);
    this.uploader = options.uploader;
    this.package = options.package;
  }

  override selectEntityImageUrl(entity: Reactodia.ElementModel): string | undefined {
    return entity.types.includes(Forms.FileType)
      ? entity.id : super.selectEntityImageUrl(entity);
  }

  async resolveAssetUrl(assetIri: string, options: { signal?: AbortSignal; }): Promise<string> {
    const {signal} = options;
    const [uploadUrl, packageUrl] = await Promise.all([
      this.uploader.resolveFileUrl(assetIri, {signal}),
      this.package.resolveFileUrl(assetIri, {signal}),
    ]);
    return uploadUrl ?? packageUrl ?? assetIri;
  }
}

function findGenealogicalProvider(rootProvider: Reactodia.DataProvider) {
  if (!(rootProvider instanceof Reactodia.CompositeDataProvider)) {
    throw new Error('Cannot find composite data provider');
  }
  const mainProvider = rootProvider.providers
    .map(p => p.provider)
    .find(p => p instanceof GenealogicalDataProvider);
  if (!mainProvider) {
    throw new Error('Cannot find main data provider');
  }
  return mainProvider;
}

class RenameGenealogicalLinksProvider extends Reactodia.RenameLinkToLinkStateProvider {
  override canRename(link: Reactodia.Link): boolean {
    return (
      link instanceof Reactodia.AnnotationLink ||
      link.typeId === schema.relatedTo
    );
  }
}

const ParentLinkTemplate: Reactodia.LinkTemplate = {
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

const OtherLinkTemplate: Reactodia.LinkTemplate = {
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

function FormInputSex(props: Forms.InputSingleProps) {
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

function FormInputImage(props: Forms.InputMultiProps) {
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

function MultilineTextInput(props: Forms.InputSingleProps) {
  return <Forms.InputText {...props} multiline />;
}
