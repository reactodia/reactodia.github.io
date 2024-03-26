import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';
import { saveAs } from 'file-saver';

export function ExampleToolbarMenu() {
  const {model, editor} = Reactodia.useWorkspace();
  return (
    <>
      <Reactodia.ToolbarActionOpen
        fileAccept='.json'
        onSelect={async file => {
          const preloadedElements = new Map<Reactodia.ElementIri, Reactodia.ElementModel>();
          for (const element of model.elements) {
            preloadedElements.set(element.iri, element.data);
          }

          const json = await file.text();
          try {
            const diagramLayout = JSON.parse(json);
            await model.importLayout({
              dataProvider: model.dataProvider,
              diagram: diagramLayout,
              preloadedElements,
              validateLinks: true,
            });
          } catch (err) {
            alert('Failed to load specified file with a diagram layout.');
          }
        }}>
        Open diagram from file
      </Reactodia.ToolbarActionOpen>
      <Reactodia.ToolbarActionSave mode='layout'
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
      <Reactodia.ToolbarActionExport kind='print' />
    </>
  );
}
