import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';

export function MainMenu(props: {
  onOpen: (bytes: Uint8Array) => void;
  onSave: () => Promise<Blob>;
}) {
  const {onOpen, onSave} = props;
  const {overlay, translation: t} = Reactodia.useWorkspace();
  return (
    <>
      <Reactodia.ToolbarActionOpen
        fileAccept='.zip'
        onSelect={async file => {
          const task = overlay.startTask({
            title: t.text('genealogical_tree.task_loading_package'),
          });
          try {
            const bytes = await file.bytes();
            onOpen(bytes);
          } catch (err) {
            task.setError(new Error(
              t.text('genealogical_tree.task_loading_package_failed'),
              { cause: err }
            ));
          } finally {
            task.end();
          }
        }}>
        {t.text('genealogical_tree.action_open_from_file')}
      </Reactodia.ToolbarActionOpen>
      <Reactodia.ToolbarActionSave
        onSelect={async () => {
          const jsonString = await onSave();
          const blob = new Blob([jsonString], {type: 'application/json'});
          const blobUrl = URL.createObjectURL(blob);
          const timestamp = new Date().toISOString().replaceAll(/[Z\s:-]/g, '');
          try {
            const downloadLink = document.createElement('a');
            downloadLink.href = blobUrl;
            downloadLink.download = `genealogy_tree_${timestamp}.zip`;
            downloadLink.click();
          } finally {
            URL.revokeObjectURL(blobUrl);
          }
        }}>
        {t.text('genealogical_tree.action_save_to_file')}
      </Reactodia.ToolbarActionSave>
      <Reactodia.ToolbarActionClearAll />
      <Reactodia.ToolbarActionExport kind='exportRaster' />
      <Reactodia.ToolbarActionExport kind='exportSvg' />
      <Reactodia.ToolbarActionExport kind='print' />
    </>
  );
}
