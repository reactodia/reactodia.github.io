import * as React from 'react';
import { HashMap } from '@reactodia/hashmap';
import * as Reactodia from '@reactodia/workspace';
import { saveAs } from 'file-saver';

export function ExampleToolbarMenu() {
  const {model, editor, overlay} = Reactodia.useWorkspace();
  return (
    <>
      <Reactodia.ToolbarActionOpen
        hotkey='Mod+O'
        fileAccept='.json'
        onSelect={async file => {
          const preloadedElements = new Map<Reactodia.ElementIri, Reactodia.ElementModel>();
          for (const element of model.elements) {
            for (const entity of Reactodia.iterateEntitiesOf(element)) {
              preloadedElements.set(entity.id, entity);
            }
          }

          const preloadedLinks = new HashMap<Reactodia.LinkKey, Reactodia.LinkModel>(
            Reactodia.hashLink,
            Reactodia.equalLinks
          );
          for (const link of model.links) {
            for (const relation of Reactodia.iterateRelationsOf(link)) {
              preloadedLinks.set(relation, relation);
            }
          }

          const task = overlay.startTask({title: 'Importing a layout from file'});
          try {
            const json = await file.text();
            const diagramLayout = JSON.parse(json);
            await model.importLayout({
              dataProvider: model.dataProvider,
              diagram: diagramLayout,
              preloadedElements,
              preloadedLinks,
              validateLinks: true,
            });
          } catch (err) {
            task.setError(new Error(
              'Failed to load specified file with a diagram layout.',
              {cause: err}
            ));
          } finally {
            task.end();
          }
        }}>
        Open diagram from file
      </Reactodia.ToolbarActionOpen>
      <Reactodia.ToolbarActionSave mode='layout'
        hotkey='Mod+S'
        onSelect={() => {
          const diagramLayout = model.exportLayout();
          const layoutString = JSON.stringify(diagramLayout);
          const blob = new Blob([layoutString], {type: 'application/json'});
          const timestamp = new Date().toISOString().replaceAll(/[Z\s:-]/g, '');
          saveAs(blob, `reactodia-diagram-${timestamp}.json`);
        }}>
        Save diagram to file
      </Reactodia.ToolbarActionSave>
      {editor.inAuthoringMode ? (
        <Reactodia.ToolbarActionSave mode='authoring'
          onSelect={() => {
            const state = editor.authoringState;
            console.log('Authoring state:', state);
            alert('Please check browser console for result');
          }}>
          Persist changes to data
        </Reactodia.ToolbarActionSave>
      ) : null}
      <Reactodia.ToolbarActionClearAll />
      <Reactodia.ToolbarActionExport kind='exportRaster' />
      <Reactodia.ToolbarActionExport kind='exportSvg' />
      <Reactodia.ToolbarActionExport kind='print' hotkey='Mod+P' />
    </>
  );
}
