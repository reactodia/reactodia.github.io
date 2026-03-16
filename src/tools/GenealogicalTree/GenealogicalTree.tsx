import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';
import * as N3 from 'n3';

import { GenealogicalPackage } from './GenealogicalPackage';
import { FileType, FormInputFile, InMemoryFileUploader } from './FormInputFile';
import { FormInputSelect } from './FormInputSelect';
import { GenealogicalMetadataProvider } from './GenealogicalMetadataProvider';
import { sh } from './OwlShaclSchema';
import { fhkb, rdfs, schema, genealogy } from './Vocabularies';
import { MainMenu } from './MainMenu';

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
  const [metadataProvider] = React.useState(() => new GenealogicalMetadataProvider({schemaProvider}));
  const [renameLinkProvider] = React.useState(() => new RenameGenealogicalLinksProvider());

  const {onMount, getContext} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    const {model, editor, overlay, translation: t, getCommandBus, performLayout} = context;

    metadataProvider.loadSchema({signal});
    editor.setAuthoringMode(true);

    let sourcePackage: GenealogicalPackage;
    if (dataSource) {
      try {
        sourcePackage = await GenealogicalPackage.loadFromBytes(dataSource.bytes, {signal});
      } catch (err) {
        throw new Error('Failed to open genealogical package', {cause: err});
      }
    } else {
      sourcePackage = GenealogicalPackage.createEmpty();
    }

    const uploader = new InMemoryFileUploader({
      factory: Reactodia.Rdf.DefaultDataFactory,
      signal,
    });
    const mainProvider = new GenealogicalDataProvider(sourcePackage, {uploader, signal});
    const dataProvider = new Reactodia.CompositeDataProvider({
      providers: [
        {
          provider: schemaProvider,
          origin: mainProvider.factory.namedNode(genealogy.SchemaOrigin),
        },
        {
          provider: mainProvider,
          origin: mainProvider.factory.namedNode(genealogy.DataOrigin),
        },
      ],
    });
    const locale = new GenealogicalLocaleProvider({
      model,
      translation: t,
      uploader: mainProvider.uploader,
      syncResolvedFileUrls: mainProvider.syncResolvedFileUrls,
    });
    await model.importLayout({
      dataProvider,
      locale,
      diagram: sourcePackage?.diagram,
      validateLinks: true,
      signal,
    });

    if (!sourcePackage.diagram) {
      const task = overlay.startTask();
      try {
        await Promise.all([fhkb.Person, fhkb.Marriage, schema.Place].map(async (type) => {
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
  }, [dataSource]);

  return (
    <Reactodia.Workspace ref={onMount}
      defaultLayout={defaultLayout}
      metadataProvider={metadataProvider}
      renameLinkProvider={renameLinkProvider}
      translations={[
        {
          'genealogical_tree': {
            'action_open_from_file': 'Open from file',
            'action_save_to_file': 'Apply changes and save to file',
          },
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
            if (types.includes(fhkb.Marriage)) {
              return MarriageTemplate;
            }
          },
          linkTemplateResolver: type => {
            if (type === fhkb.hasParent) {
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
          inputResolver: (property, inputProps) => {
            if (property === rdfs.comment) {
              return <Reactodia.FormInputList {...inputProps} valueInput={MultilineTextInput} />;
            } else if (property === fhkb.hasSex) {
              return <Reactodia.FormInputList {...inputProps} valueInput={FormInputSex} />;
            } else if (property === Reactodia.schema.thumbnailUrl) {
              return <FormInputImage {...inputProps} />;
            }
            return null;
          }
        }}
      />
    </Reactodia.Workspace>
  );
}

class GenealogicalDataProvider extends Reactodia.RdfDataProvider {
  readonly uploader: InMemoryFileUploader;
  // Workaround: resolve thumbnail URLs from package
  readonly syncResolvedFileUrls = new Map<string, string | undefined>();

  private _dataset = Reactodia.indexedDataset(
    Reactodia.IndexQuadBy.SP
  );

  constructor(
    readonly sourcePackage: GenealogicalPackage,
    options: {
      uploader: InMemoryFileUploader;
      signal: AbortSignal;
    }
  ) {
    super({
      datatypePredicates: [fhkb.hasSex, Reactodia.schema.thumbnailUrl],
    });
    const {uploader} = options;
    this.uploader = uploader;
    this.addGraph(sourcePackage.graph);
    this._dataset.addAll(sourcePackage.graph);
  }

  override async elements(params: {
    elementIds: ReadonlyArray<Reactodia.ElementIri>;
    signal?: AbortSignal;
  }): Promise<Map<Reactodia.ElementIri, Reactodia.ElementModel>> {
    let result = await super.elements(params);

    // Workaround to resolve thumbnail URLs
    const resolveUrlTasks: Promise<void>[] = [];
    for (const data of result.values()) {
      if (data.types.includes(FileType) && !this.syncResolvedFileUrls.has(data.id)) {
        this.syncResolvedFileUrls.set(data.id, undefined);
        resolveUrlTasks.push(this.addSyncResolvedFileUrl(this.factory.namedNode(data.id)));
      }
      if (Object.hasOwn(data.properties, Reactodia.schema.thumbnailUrl)) {
        for (const thumbnailIri of data.properties[Reactodia.schema.thumbnailUrl]) {
          if (thumbnailIri.termType === 'NamedNode' && !this.syncResolvedFileUrls.has(thumbnailIri.value)) {
            this.syncResolvedFileUrls.set(thumbnailIri.value, undefined);
            resolveUrlTasks.push(this.addSyncResolvedFileUrl(thumbnailIri));
          }
        }
      }
    }
    await Promise.all(resolveUrlTasks);

    return result;
  }

  private async addSyncResolvedFileUrl(fileIri: Reactodia.Rdf.NamedNode): Promise<void> {
    const url = await this.sourcePackage.resolveFileUrl(fileIri.value);
    if (url) {
      this.syncResolvedFileUrls.set(fileIri.value, url);
    }
  }
}

// Workaround: resolve in-memory thumbnails
class GenealogicalLocaleProvider extends Reactodia.DefaultDataLocaleProvider {
  private readonly uploader: InMemoryFileUploader;
  private readonly syncResolvedFileUrls: ReadonlyMap<string, string | undefined>;

  constructor(options: Reactodia.DefaultDataLocaleProviderOptions & {
    uploader: InMemoryFileUploader;
    syncResolvedFileUrls: ReadonlyMap<string, string | undefined>;
  }) {
    super(options);
    this.uploader = options.uploader;
    this.syncResolvedFileUrls = options.syncResolvedFileUrls;
  }

  override selectEntityImageUrl(entity: Reactodia.ElementModel): string | undefined {
    const url = entity.types.includes(FileType) ? entity.id : super.selectEntityImageUrl(entity);
    if (url) {
      return (
        this.syncResolvedFileUrls.get(url) ??
        this.uploader.resolveFileUrlSync(url) ??
        url
      );
    }
    return url;
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

const MarriageTemplate: Reactodia.ElementTemplate = {
  ...Reactodia.RoundTemplate,
  renderElement: props => <MarriageEntity {...props} />,
  supports: {
    ...Reactodia.RoundTemplate.supports,
    [Reactodia.TemplateProperties.ElementSize]: true,
  },
};

function MarriageEntity(props: Reactodia.TemplateProps) {
  const size = props.element.elementState.get(Reactodia.TemplateProperties.ElementSize);
  const style = {
    '--genealogical-tree-element-width': size ? `${size.width}px` : undefined,
    '--genealogical-tree-element-height': size ? `${size.height}px` : undefined,
  } as React.CSSProperties;
  return (
    <Reactodia.RoundEntity {...props}
      className={styles.marriage}
      style={style}
    />
  );
}

const ParentLinkTemplate: Reactodia.LinkTemplate = {
  ...Reactodia.StandardLinkTemplate,
  markerTarget: {
    ...Reactodia.LinkMarkerArrowhead,
    fill: '#4b4a67',
    stroke: '#4b4a67',
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
  markerTarget: {
    ...Reactodia.LinkMarkerArrowhead,
    fill: 'var(--reactodia-color-emphasis-600)',
  },
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

function FormInputSex(props: Reactodia.FormInputSingleProps) {
  const {model} = Reactodia.useWorkspace();
  const variants = React.useMemo(() => [
    model.dataProvider.factory.namedNode(fhkb.Male),
    model.dataProvider.factory.namedNode(fhkb.Female),
  ], []);
  return (
    <FormInputSelect {...props} variants={variants} />
  );
}

function FormInputImage(props: Reactodia.FormInputMultiProps) {
  const {model} = Reactodia.useWorkspace();
  const mainProvider = findGenealogicalProvider(model.dataProvider);
  return (
    <FormInputFile {...props}
      uploader={mainProvider.uploader}
      fileAccept='.jpg,.jpeg,.png,.svg,.gif'
      getFileKind={url => /.\.(?:jpg|jpeg|png|svg|gif)$/.test(url) ? 'image' : 'default'}
    />
  );
}

function MultilineTextInput(props: Reactodia.FormInputSingleProps) {
  return <Reactodia.FormInputText {...props} multiline />;
}
