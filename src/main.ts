import { Plugin } from 'obsidian';

import { BibtexAdderPluginSettings, BIBTEX_ADDER_DEFAULT_SETTINGS, BibtexAdderSettingTab } from './settings';
import { BibtexAdderModal } from './modal';


export default class BibtexAdderPlugin extends Plugin {
  settings: BibtexAdderPluginSettings;

  async onload() {
    await this.loadSettings();

    // This creates an icon in the left ribbon.
    if (this.settings.addRibbonAction) {
      const ribbonIconEl = this.addRibbonIcon('paper-plane', 'Add BibTeX from DOI', (evt: MouseEvent) => {
        // Called when the user clicks the icon.
        new BibtexAdderModal(this.app, this.settings).open();
      });
    }

    // for settings
    this.addSettingTab(new BibtexAdderSettingTab(this.app, this));

    // Command that creates a note from DOI information.
    this.addCommand({
      id: "add-bibtex-modal",
      name: "Add BibTeX entry from DOI",
      callback: () => {
        new BibtexAdderModal(this.app, this.settings).open();
      },
    });
  }

  async loadSettings() {
    this.settings = Object.assign(
      {}, BIBTEX_ADDER_DEFAULT_SETTINGS, await this.loadData()
    );
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

}
