import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';

import styles from './CopyPaste.module.css';

export function SelectionActionCopy() {
  const {model} = Reactodia.useWorkspace();
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <Reactodia.SelectionAction
        className={styles.copyAction}
        dock='nw'
        hotkey='Mod+C'
        onSelect={() => {
          if (inputRef.current) {
            inputRef.current.value = ' ';
            inputRef.current.focus();
            inputRef.current.select();
            document.execCommand('copy');
          }
        }}
      />
      <input ref={inputRef}
        type='text'
        className={styles.copyInput}
        onCopy={e => {
          e.preventDefault();
          const elements = model.selection
            .filter(item => item instanceof Reactodia.Element);
          if (elements.length === 0) {
            return;
          }
          const elementIds = new Set(elements.map(item => item.id));
          const links = model.links.filter(link =>
            elementIds.has(link.sourceId) && elementIds.has(link.targetId)
          );
          e.clipboardData?.setData('text/plain', JSON.stringify({elements, links}));
        }}
      />
    </>
  );
}

const PASTE_ELEMENT_CELLS: Reactodia.SerializableElementCell[] = [
  Reactodia.EntityElement,
  Reactodia.AnnotationElement,
];

const PASTE_LINK_CELLS: Reactodia.SerializableLinkCell[] = [
  Reactodia.RelationLink,
  Reactodia.AnnotationLink,
];

export function ToolbarActionPaste() {
  const workspace = Reactodia.useWorkspace();
  return (
    <Reactodia.ToolbarAction
      className={styles.pasteAction}
      hotkey='Mod+V'
      onSelect={async () => {
        const clipboardItems = await navigator.clipboard.read();
        for (const item of clipboardItems) {
          if (item.types.includes('text/plain')) {
            const dataBlob = await item.getType('text/plain');
            const data = await dataBlob.text();
            pasteClipboardData(workspace, data);
          }
        }
      }}>
      <span className={styles.pasteLabel}>Paste</span>
    </Reactodia.ToolbarAction>
  );
}

function pasteClipboardData(
  workspace: Reactodia.WorkspaceContext,
  data: string
): void {
  const {model} = workspace;
  try {
    const {elements, links} = JSON.parse(data) as {
      elements: Reactodia.SerializedElement[];
      links: Reactodia.SerializedLink[];
    };

    const pastedElements = new Map<string, Reactodia.Element>();
    for (const state of elements) {
      if (model.getElement(state['@id'])) {
        continue;
      }
      for (const cell of PASTE_ELEMENT_CELLS) {
        if (state['@type'] === cell.fromJSONType) {
          const element = cell.fromJSON(state, {
            getInitialData: iri => undefined,
            mapTemplateState: from => from,
          });
          if (element) {
            pastedElements.set(element.id, element);
          }
          break;
        }
      }
    }

    const pastedLinks: Reactodia.Link[] = [];
    for (const state of links) {
      if (model.getLink(state['@id'])) {
        continue;
      }
      for (const cell of PASTE_LINK_CELLS) {
        if (state['@type'] === cell.fromJSONType) {
          const source = model.getElement(state.source['@id'])
            ?? pastedElements.get(state.source['@id']);
          const target = model.getElement(state.target['@id'])
            ?? pastedElements.get(state.target['@id']);
          if (source && target) {
            const link = cell.fromJSON(state, {
              source,
              target,
              getInitialData: iri => undefined,
              mapTemplateState: from => from,
            });
            if (link) {
              pastedLinks.push(link);
            }
          }
          break;
        }
      }
    }

    if (pastedElements.size > 0 || pastedLinks.length > 0) {
      const batch = model.history.startBatch('Paste data');
      const pastedIris = new Set<Reactodia.ElementIri>();
      for (const element of pastedElements.values()) {
        model.addElement(element);
        for (const entity of Reactodia.iterateEntitiesOf(element)) {
          pastedIris.add(entity.id);
        }
      }
      for (const link of pastedLinks) {
        model.addLink(link);
      }
      batch.history.execute(
        Reactodia.requestElementData(model, Array.from(pastedIris))
      );
      batch.history.execute(
        Reactodia.restoreLinksBetweenElements(model, {
          addedElements: Array.from(pastedIris),
        })
      );
      batch.store();
    }
  } catch (err) {
    console.warn('Reactodia: failed to parse pasted data');
  }
}
