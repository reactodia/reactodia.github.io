import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';

import { ToolbarActionPaste } from './CopyPaste';
import { genealogy, schema } from './Vocabularies';

export function MainMenu(props: {
  onOpen: (bytes: Uint8Array) => void;
  onSave: () => Promise<Blob>;
}) {
  const {onOpen, onSave} = props;
  const {model, editor, overlay, translation: t} = Reactodia.useWorkspace();
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
      <Reactodia.ToolbarAction
        onSelect={() => {
          const batch = model.history.startBatch(
            Reactodia.TranslatedText.text('genealogical_tree.reset_pinned_properties')
          );
          try {
            for (const element of model.elements) {
              if (
                element instanceof Reactodia.EntityElement &&
                element.data.types.includes(schema.Person)
              ) {
                batch.history.execute(Reactodia.setElementState(
                  element,
                  element.elementState
                    .set(Reactodia.TemplateProperties.PinnedProperties, {
                      ...element.elementState.get(Reactodia.TemplateProperties.PinnedProperties),
                      [schema.birthDate]: true,
                      [schema.deathDate]: true,
                    })
                ));
              }
            }
          } finally {
            batch.store();
          }
        }}>
        {t.text('genealogical_tree.reset_pinned_properties')}
      </Reactodia.ToolbarAction>
      <Reactodia.ToolbarAction
        onSelect={() => {
          const batch = model.history.startBatch(
            Reactodia.TranslatedText.text('genealogical_tree.migrate_data_schema')
          );
          try {
            for (const link of model.links) {
              if (link instanceof Reactodia.RelationLink) {
                if (link.data.linkTypeId === schema.relatedTo) {
                  const customLabel = link.linkState.get(
                    Reactodia.TemplateProperties.CustomLabel
                  );
                  if (customLabel) {
                    editor.changeRelation(link.data, {
                      ...link.data,
                      properties: {
                        ...link.data.properties,
                        [Reactodia.rdfs.label]: [model.factory.literal(customLabel)],
                      }
                    });
                    batch.history.execute(Reactodia.setLinkState(
                      link,
                      link.linkState.set(Reactodia.TemplateProperties.CustomLabel, undefined)
                    ));
                  }
                } else if (link.data.linkTypeId === schema.deathPlace) {
                  editor.changeRelation(link.data, {
                    ...link.data,
                    linkTypeId: genealogy.burialPlace,
                  });
                }
              }
            }
          } finally {
            batch.store();
          }
        }}>
        {t.text('genealogical_tree.migrate_data_schema')}
      </Reactodia.ToolbarAction>
      <ToolbarActionPaste />
      <Reactodia.ToolbarActionClearAll />
      <Reactodia.ToolbarActionExport kind='exportRaster' />
      <Reactodia.ToolbarActionExport kind='exportSvg' />
      <Reactodia.ToolbarActionExport kind='print' />
    </>
  );
}
