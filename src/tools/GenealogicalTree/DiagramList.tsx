import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';
import cx from 'clsx';

import { Icon } from './Icon';
import { SharedHistory, SharedHistoryRef } from './SharedHistory';

import styles from './DiagramList.module.css';

export interface DiagramState {
  readonly id: string;
  readonly iri: Reactodia.ElementIri;
  readonly initialDiagram: Reactodia.SerializedDiagram | undefined;
  readonly workspace: Reactodia.TrackedWorkspaceContext;
}

export function createDiagramState(
  iri: Reactodia.ElementIri,
  baseHistory: SharedHistory,
  initialDiagram: Reactodia.SerializedDiagram | undefined,
  params: Reactodia.CreateWorkspaceParams
): DiagramState {
  const id = Reactodia.Rdf.getLocalName(iri) ?? iri;
  return {
    id,
    iri,
    initialDiagram,
    workspace: Reactodia.createWorkspace({
      ...params,
      history: new SharedHistoryRef(baseHistory, id),
    }),
  };
}

export function DiagramList(props: {
  diagrams: readonly DiagramState[];
  activeDiagram: string | undefined;
  onActivate: (target: DiagramState) => void;
  onCreate: () => void;
  onEdit: (state: DiagramState) => void;
  onDelete: (target: DiagramState) => void;
}) {
  const {diagrams, activeDiagram, onActivate, onCreate, onEdit, onDelete} = props;
  const t = Reactodia.useTranslation();

  const [term, setTerm] = React.useState('');
  const filteredDiagrams = React.useMemo(() => {
    if (term) {
      return diagrams.filter(state => state.id.includes(term));
    }
    return diagrams;
  }, [diagrams, term]);

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          type="text"
          className={cx('reactodia-form-control', styles.searchInput)}
          placeholder='Search diagrams...'
          value={term}
          onChange={e => setTerm(e.currentTarget.value)}
        />
        {term.length > 0 && (
          <button
            className={cx(
              'reactodia-btn reactodia-btn-default',
              styles.searchClear
            )}
            onClick={() => setTerm('')}>
            <Icon />
          </button>
        )}
      </div>
      {filteredDiagrams.length === 0 && (
        <div className={styles.noResults}>
          {t.text('search_defaults.no_results')}
        </div>
      )}
      <DiagramListEntries
        diagrams={filteredDiagrams}
        activeDiagram={activeDiagram}
        searchTerm={term}
        onActivate={onActivate}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <button
        className={cx(
          'reactodia-btn reactodia-btn-primary',
          'tool-icon',
          styles.actionAdd
        )}
        onClick={() => {
          setTerm('');
          onCreate();
        }}>
        <Icon /> Add diagram
      </button>
    </div>
  );
}

function DiagramListEntries(props: {
  diagrams: readonly DiagramState[];
  activeDiagram: string | undefined;
  searchTerm: string;
  onActivate: (state: DiagramState) => void;
  onEdit: (state: DiagramState) => void;
  onDelete: (state: DiagramState) => void;
}) {
  const {diagrams, activeDiagram, searchTerm, onActivate, onEdit, onDelete} = props;
  const canDelete = diagrams.length > 1;
  return (
    <Reactodia.FocusGroup>
      {({ref, controller}) => (
        <ul ref={ref}
          className={styles.listRoot}
          role='list'
          aria-multiselectable={false}
          onClick={controller.defaultClick}
          onKeyDown={controller.defaultKeyDown}>
          {diagrams.map(item => (
            <DiagramListEntry key={item.id}
              item={item}
              selected={item.id === activeDiagram}
              searchTerm={searchTerm}
              onActivate={onActivate}
              onEdit={onEdit}
              onDelete={canDelete ? onDelete : undefined}
            />
          ))}
        </ul>
      )}
    </Reactodia.FocusGroup>
  );
}

function DiagramListEntry(props: {
  item: DiagramState;
  selected: boolean;
  searchTerm: string;
  onActivate: (state: DiagramState) => void;
  onEdit: (state: DiagramState) => void;
  onDelete: ((state: DiagramState) => void) | undefined;
}) {
  const {item, selected, searchTerm, onActivate, onEdit, onDelete} = props;
  const {ref, tabIndex} = Reactodia.useFocusGroupItem();
  return (
    <li ref={ref}
      className={styles.listItem}
      role='listitem'
      aria-selected={selected}>
      <button tabIndex={tabIndex}
        className={cx(
          styles.diagramItem,
          selected ? styles.activeItem : undefined,
        )}
        onClick={() => onActivate(item)}>
        <DiagramLabel state={item} highlightTerm={searchTerm} />
      </button>
      <div className={styles.itemActions}>
        <button tabIndex={tabIndex}
          className={cx(
            'reactodia-btn reactodia-btn-default',
            styles.actionEdit,
          )}
          onClick={() => onEdit(item)}>
          <Icon />
        </button>
        {onDelete && (
          <button tabIndex={tabIndex}
            className={cx(
              'reactodia-btn reactodia-btn-default',
              styles.actionDelete,
            )}
            onClick={() => onDelete(item)}>
            <Icon />
          </button>
        )}
      </div>
      <div className={styles.itemSeparator} />
    </li>
  );
}

function DiagramLabel(props: {
  state: DiagramState;
  highlightTerm?: string;
}) {
  const {state, highlightTerm} = props;
  const {model, editor} = state.workspace;

  const language = Reactodia.useObservedProperty(
    model.events, 'changeLanguage', () => model.language
  );
  const {data: providedData} = Reactodia.useProvidedEntities(model.dataProvider, [state.iri]);
  const authoredEvent = Reactodia.useObservedProperty(
    editor.events,
    'changeAuthoringState',
    () => editor.authoringState.elements.get(state.iri)
  );
  const data = authoredEvent?.data
    ?? providedData.get(state.iri)
    ?? Reactodia.EntityElement.placeholderData(state.iri);

  const label = model.locale.formatEntityLabel(data, language);
  return Reactodia.highlightSubstring(label, highlightTerm);
}
