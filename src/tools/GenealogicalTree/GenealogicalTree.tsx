import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';
import * as Forms from '@reactodia/workspace/forms';
import * as N3 from 'n3';

import { GenealogicalPropertyEditor } from './FormInputs';
import { SelectionActionCopy } from './CopyPaste';
import { DiagramList, DiagramState, createDiagramState } from './DiagramList';
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
import { useSharedHistory } from './SharedHistory';
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

  const [diagrams, setDiagrams] = React.useState<readonly DiagramState[]>([]);
  const [activeDiagram, setActiveDiagram] = React.useState<string>();

  const [dataSource, setDataSource] = React.useState<DataSource>();

  const [t] = React.useState(() => new Reactodia.DefaultTranslation({
    bundles: [
      {
        ...enTranslation,
        'visual_authoring': {
          'property.load_error.text': '⚠ Failed to load variants',
        },
      },
      Reactodia.DefaultTranslationBundle,
    ]
  }));
  const baseHistory = useSharedHistory({
    activateOrigin: (originId: string) => {
      if (diagrams.some(d => d.id === originId)) {
        setActiveDiagram(originId);
      }
    },
  });

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
  const [workspaceParams] = React.useState((): Reactodia.CreateWorkspaceParams => ({
    translation: t,
    defaultLayout,
    metadataProvider,
    validationProvider,
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

  const {data: dataProvider, status: loadStatus, error: loadError} = Reactodia.useAsync({
    input: [dataSource, workspaceParams],
    load: async ([dataSource, workspaceParams], {signal}): Promise<Reactodia.DataProvider | undefined> => {
      metadataProvider.loadSchema({signal});

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
      validationProvider.setProvider(mainProvider);

      const initialWorkspaceParams: Reactodia.CreateWorkspaceParams = {
        ...workspaceParams,
        defaultLanguage: readDefaultLanguage(metadataProvider),
      };
      const packageDiagrams = Array.from(
        sourcePackage.diagrams,
        ([iri, diagram]) => createDiagramState(
          iri,
          baseHistory,
          diagram,
          {
            ...initialWorkspaceParams,
            renameLinkProvider: new RenameGenealogicalLinksProvider(),
          }
        ),
      );
      if (packageDiagrams.length === 0) {
        const diagram = await metadataProvider.createEntity(genealogy.Diagram, {
          translation: t,
          language: 'en',
          signal,
        });
        const state = createDiagramState(
          diagram.data.id,
          baseHistory,
          undefined,
          {
            ...initialWorkspaceParams,
            renameLinkProvider: new RenameGenealogicalLinksProvider(),
          }
        );
        state.workspace.editor.setAuthoringState(
          Reactodia.AuthoringState.addEntity(
            Reactodia.AuthoringState.empty,
            diagram.data
          )
        );
        packageDiagrams.push(state);
      }
      setDiagrams(packageDiagrams);
      setActiveDiagram(packageDiagrams[0].id);

      baseHistory.reset();
      return dataProvider;
    }
  });

  React.useEffect(() => {
    if (loadError) {
      console.log('Failed to load package', loadError);
    }
  }, [loadError]);

  const syncingAuthoringState = React.useRef(false);
  const onChangeAuthoringState = (e: Reactodia.EditorEvents['changeAuthoringState']) => {
    if (!syncingAuthoringState.current) {
      syncingAuthoringState.current = true;

      metadataProvider.updateSettings(e.source.authoringState);

      const batch = baseHistory.startBatch();
      for (const state of diagrams) {
        state.workspace.editor.setAuthoringState(e.source.authoringState);
      }
      batch.discard();
      syncingAuthoringState.current = false;
    }
  };

  const onSavePackage = async () => {
    if (!dataProvider || diagrams.length === 0) {
      throw new Error('Cannot save non-initialized workspace state');
    }
    const {editor} = diagrams[0].workspace;
    const mainProvider = findGenealogicalProvider(dataProvider);

    // Capture authoring state before finalizing the diagram
    const exportedDiagrams = new Map<string, Reactodia.SerializedDiagram>();
    const authoringState = editor.authoringState;
    const batch = baseHistory.startBatch();
    syncingAuthoringState.current = true;
    for (const state of diagrams) {
      state.workspace.editor.setAuthoringState(authoringState);
      state.workspace.editor.applyAuthoringChanges();
      exportedDiagrams.set(state.id, state.workspace.model.exportLayout());
    }
    syncingAuthoringState.current = false;
    batch.store();

    const updatedPackage = await mainProvider.sourcePackage.exportWith({
      dataProvider: mainProvider,
      authoringState: mainProvider.cleanupAuthoring(authoringState),
      diagrams: exportedDiagrams,
      uploader: mainProvider.uploader,
    });
    setDataSource({bytes: await updatedPackage.bytes()});
    return updatedPackage;
  };

  const onActivateDiagram = React.useCallback(
    (target: DiagramState) => setActiveDiagram(target.id),
    [setActiveDiagram]
  );
  const onCreateDiagram = React.useCallback(
    () => {
      const createdState = createDiagramState(
        `diagram-${Reactodia.Rdf.DefaultDataFactory.blankNode().value}`,
        baseHistory,
        undefined,
        {
          ...workspaceParams,
          renameLinkProvider: new RenameGenealogicalLinksProvider(),
          defaultLanguage: readDefaultLanguage(metadataProvider),
        }
      );
      baseHistory.execute(new InsertDiagramCommand(
        createdState,
        diagrams.length,
        setDiagrams,
        activeDiagram,
        setActiveDiagram
      ));
    },
    [diagrams, activeDiagram]
  );
  const onEditDiagram = React.useCallback(
    (target: DiagramState) => {
      const {getCommandBus} = target.workspace;
      const diagramEntity: Reactodia.ElementModel = {
        id: target.iri,
        types: [genealogy.Diagram],
        properties: {},
      };
      setActiveDiagram(target.id);
      getCommandBus(Reactodia.VisualAuthoringTopic)
        .trigger('editEntity', {target: diagramEntity});
    },
    []
  );
  const onDeleteDiagram = React.useCallback(
    (target: DiagramState) => {
      const targetIndex = diagrams.findIndex(state => state === target);
      if (targetIndex >= 0) {
        baseHistory.execute(new RemoveDiagramCommand(
          diagrams[targetIndex],
          targetIndex,
          setDiagrams,
          activeDiagram,
          setActiveDiagram
        ));
      }
    },
    [diagrams, activeDiagram]
  );

  return (
    <Reactodia.TranslationProvider translation={t}>
      <Reactodia.WorkspaceRoot>
        <Reactodia.WorkspaceLayoutRow>
          <Reactodia.WorkspaceLayoutColumn id="sidebar"
            defaultSize={200}
            minSize={80}>
            <Reactodia.WorkspaceLayoutItem id="navigation">
              <DiagramList
                diagrams={diagrams}
                activeDiagram={activeDiagram}
                onActivate={onActivateDiagram}
                onCreate={onCreateDiagram}
                onEdit={onEditDiagram}
                onDelete={onDeleteDiagram}
              />
            </Reactodia.WorkspaceLayoutItem>
          </Reactodia.WorkspaceLayoutColumn>
          <Reactodia.WorkspaceLayoutItem id="diagram" undocked>
            {dataProvider ? (
              <>
                {diagrams.map(state => (
                  <div key={state.id}
                    className={styles.singleDiagram}
                    style={state.id === activeDiagram ? {} : {visibility: 'hidden', pointerEvents: 'none'}}>
                    <SingleDiagram
                      workspace={state.workspace}
                      dataProvider={dataProvider}
                      initialDiagram={state.initialDiagram}
                      onLoad={() => {
                        if (state.initialDiagram) {
                          state.workspace.editor.setAuthoringState(Reactodia.AuthoringState.empty);
                          baseHistory.reset();
                        }
                      }}
                      onChangeAuthoringState={onChangeAuthoringState}>
                      <SingleDiagramLayout
                        onOpen={bytes => setDataSource({bytes})}
                        onSave={onSavePackage}
                      />
                    </SingleDiagram>
                  </div>
                ))}
              </>
            ) : (
              <div className={styles.contentSpinner}>
                <Reactodia.HtmlSpinner width={32} height={32} errorOccurred={loadStatus === 'error'} />
              </div>
            )}
          </Reactodia.WorkspaceLayoutItem>
        </Reactodia.WorkspaceLayoutRow>
      </Reactodia.WorkspaceRoot>
    </Reactodia.TranslationProvider>
  );
}

function readDefaultLanguage(metadataProvider: GenealogicalMetadataProvider): string | undefined {
  const initialSettings = metadataProvider.getSettings();
  const defaultLanguage = termAsString(getSinglePropertyValue(
    initialSettings, genealogy.defaultLanguage
  ));
  return defaultLanguage;
}

class InsertDiagramCommand implements Reactodia.Command {
  constructor(
    private readonly target: DiagramState,
    private readonly insertAt: number,
    private readonly setDiagrams: (
      update: (states: readonly DiagramState[]) => readonly DiagramState[]
    ) => void,
    private readonly previousActiveId: string | undefined,
    private readonly setActiveDiagram: (diagramId: string | undefined) => void
  ) {}

  get title(): Reactodia.Command['title'] {
    return 'Create diagram';
  }

  invoke(): Reactodia.Command {
    const {target, insertAt, setDiagrams, previousActiveId, setActiveDiagram} = this;
    setDiagrams(previous => {
      const next = [...previous];
      next.splice(insertAt, 0, target);
      return next;
    });
    setActiveDiagram(target.id);
    return new RemoveDiagramCommand(
      target, insertAt, setDiagrams, previousActiveId, setActiveDiagram
    );
  }
}

class RemoveDiagramCommand implements Reactodia.Command {
  constructor(
    private readonly target: DiagramState,
    private readonly targetIndex: number,
    private readonly setDiagrams: (
      update: (states: readonly DiagramState[]) => readonly DiagramState[]
    ) => void,
    private readonly nextActiveId: string | undefined,
    private readonly setActiveDiagram: (diagramId: string | undefined) => void
  ) {}

  get title(): Reactodia.Command['title'] {
    return 'Remove diagram';
  }

  invoke(): Reactodia.Command {
    const {target, targetIndex, setDiagrams, nextActiveId, setActiveDiagram} = this;
    setDiagrams(previous => previous.filter(state => state !== target));
    setActiveDiagram(nextActiveId);
    return new InsertDiagramCommand(
      target, targetIndex, setDiagrams, nextActiveId, setActiveDiagram
    );
  }
}

function SingleDiagram(props: {
  workspace: Reactodia.TrackedWorkspaceContext;
  dataProvider: Reactodia.DataProvider;
  initialDiagram?: Reactodia.SerializedDiagram;
  onLoad: (context: Reactodia.WorkspaceContext) => void;
  onChangeAuthoringState: (e: Reactodia.EditorEvents['changeAuthoringState']) => void;
  children?: React.ReactElement;
}) {
  const {
    workspace, dataProvider, initialDiagram, onLoad, onChangeAuthoringState, children,
  } = props;

  const handlers = React.useRef({onLoad, onChangeAuthoringState});
  React.useEffect(() => {
    handlers.current = {onLoad, onChangeAuthoringState};
  });

  const {onMount} = Reactodia.useLoadedWorkspace(async ({context, signal}) => {
    const {model, view, editor, overlay, translation: t, getCommandBus, performLayout} = context;
    const renameLinkProvider =
      view.renameLinkProvider as RenameGenealogicalLinksProvider | undefined;
    renameLinkProvider?.setWorkspace(workspace);

    editor.setAuthoringMode(true);

    const listener = new Reactodia.EventObserver();
    listener.listen(editor.events, 'changeAuthoringState', e => {
      handlers.current.onChangeAuthoringState(e);
    });
    signal.addEventListener('abort', () => listener.stopListening());

    const mainProvider = findGenealogicalProvider(dataProvider);
    const locale = new GenealogicalLocaleProvider({
      model,
      translation: t,
      uploader: mainProvider.uploader,
      package: mainProvider.sourcePackage,
    });
    await model.importLayout({
      dataProvider,
      locale,
      diagram: initialDiagram,
      validateLinks: true,
      signal,
    });

    // if (!initialDiagram && mainProvider.sourcePackage.diagrams.size === 0) {
    //   const task = overlay.startTask();
    //   try {
    //     await Promise.all([schema.Person, genealogy.Marriage, schema.Place].map(async (type) => {
    //       const items = await mainProvider.lookup({elementTypeId: type});
    //       for (const {element} of items) {
    //         model.createElement(element.id);
    //       }
    //     }));
    //     await model.requestData();
    //     await performLayout({signal});
    //   } catch (error) {
    //     task.setError(error);
    //   } finally {
    //     task.end();
    //   }
    // }

    //   if (model.elements.length === 0) {
    //     getCommandBus(Reactodia.UnifiedSearchTopic)
    //       .trigger('focus', { sectionKey: 'elementTypes' });
    //   }
    // }

    const allEntities = new Set<Reactodia.ElementIri>();
    for (const element of model.elements) {
      for (const entity of Reactodia.iterateEntitiesOf(element)) {
        allEntities.add(entity.id);
      }
    }
    editor.revalidateEntities(allEntities);

    handlers.current.onLoad(context);
  }, []);

  return (
    <Reactodia.WorkspaceProvider workspace={workspace}
      onMount={onMount}>
      {children}
    </Reactodia.WorkspaceProvider>
  );
}

function SingleDiagramLayout(props: {
  onOpen: (bytes: Uint8Array) => void;
  onSave: () => Promise<Blob>;
}) {
  const {onOpen, onSave} = props;
  return (
    <Reactodia.DefaultWorkspace
      className={styles.workspace}
      menu={
        <>
          <MainMenu
            onOpen={onOpen}
            onSave={onSave}
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
      halo={{
        children: (
          <>
            <Reactodia.SelectionActionGroup dock='nw' dockColumn={1} />
            <Reactodia.SelectionActionRemove dock='ne' />
            <Reactodia.SelectionActionExpand dock='s' />
            <Reactodia.SelectionActionAnchor dock='w' />
            <Reactodia.SelectionActionConnections dock='e' />
            <Reactodia.SelectionActionAddToFilter dock='se' />
            <Reactodia.SelectionActionAnnotate dock='se' dockColumn={1} />
            <Reactodia.SelectionActionEstablishLink dock='sw' />
            <SelectionActionCopy />
          </>
        )
      }}
      selection={{
        children: (
          <>
            <Reactodia.SelectionActionZoomToFit dock='nw' dockColumn={1} />
            <Reactodia.SelectionActionLayout dock='nw' dockColumn={2} />
            <Reactodia.SelectionActionGroup dock='nw' dockColumn={3} />
            <Reactodia.SelectionActionRemove dock='ne' />
            <Reactodia.SelectionActionConnections dock='e' />
            <Reactodia.SelectionActionExpand dock='s' />
            <Reactodia.SelectionActionAnnotate dock='se' dockColumn={1} />
            <SelectionActionCopy />
          </>
        )
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
