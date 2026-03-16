import * as Reactodia from '@reactodia/workspace';

import SettingsGearIcon from '@vscode/codicons/src/icons/settings-gear.svg';

import { genealogy } from './Vocabularies';

import styles from './OpenPackageSettings.module.css';

export function OpenPackageSettings() {
  const {model, editor, overlay, getCommandBus} = Reactodia.useWorkspace();
  const t = Reactodia.useTranslation();

  const settingsChange = Reactodia.useObservedProperty(
    editor.events,
    'changeAuthoringState',
    () => editor.authoringState.elements.get(genealogy.ActiveSettings)
  );

  return (
    <Reactodia.ToolbarAction
      className={styles.action}
      title={t.text('genealogical_tree.action_open_settings')}
      onSelect={async () => {
        const task = overlay.startTask();
        let settings = settingsChange?.data;
        if (!settings) {
          try {
            const entities = await model.dataProvider.elements({
              elementIds: [genealogy.ActiveSettings],
            });
            settings = entities.get(genealogy.ActiveSettings) ?? {
              id: genealogy.ActiveSettings,
              types: [genealogy.PackageSettings],
              properties: {},
            };
          } finally {
            task.end();
          }
        }
        getCommandBus(Reactodia.VisualAuthoringTopic)
          .trigger('editEntity', {target: settings});
      }}
    >
      <SettingsGearIcon width={16} height={16} />
      {settingsChange ? <div className={styles.indicator}>•</div> : null}
    </Reactodia.ToolbarAction>
  );
}
