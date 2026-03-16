import * as Reactodia from '@reactodia/workspace';

import SettingsGearIcon from '@vscode/codicons/src/icons/settings-gear.svg';

import { GenealogicalMetadataProvider } from './GenealogicalMetadataProvider';
import { genealogy } from './Vocabularies';

import styles from './OpenPackageSettings.module.css';

export function OpenPackageSettings() {
  const {editor, getCommandBus} = Reactodia.useWorkspace();
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
        const provider = editor.metadataProvider;
        if (provider instanceof GenealogicalMetadataProvider) {
          getCommandBus(Reactodia.VisualAuthoringTopic)
            .trigger('editEntity', {target: provider.getSettings()});
        }
      }}
    >
      <SettingsGearIcon width={16} height={16} />
      {settingsChange ? <div className={styles.indicator}>•</div> : null}
    </Reactodia.ToolbarAction>
  );
}
