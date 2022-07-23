import {App, PluginSettingTab, Setting} from 'obsidian';

import BibtexAdderPlugin from './main';

export interface BibtexAdderPluginSettings {
  bibtexLocation: string;
  indentBibtex: boolean;
  addRibbonAction: boolean;
}

export const BIBTEX_ADDER_DEFAULT_SETTINGS: BibtexAdderPluginSettings = {
  bibtexLocation: 'bibtex.md',
  indentBibtex: true,
  addRibbonAction: true,
}

export class BibtexAdderSettingTab extends PluginSettingTab {
  plugin: BibtexAdderPlugin;

  constructor(app: App, plugin: BibtexAdderPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();
    containerEl.createEl('h2', { text: 'BibTeX Adder Plugin: Settings.' });

    new Setting(containerEl)
      .setName('BibTeX Location')
      .setDesc('Set the location of the BibTeX file.')
      .addTextArea(text => {
        text
          .setValue(this.plugin.settings.bibtexLocation)
          .onChange(async (value) => {
              try {
                  this.plugin.settings.bibtexLocation = value;
                  await this.plugin.saveSettings();
              } catch (e) {
                  return false;
              }
          })
      });

    new Setting(containerEl)
      .setName('Indent BibTeX entry')
      .setDesc('Indent each item.')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.indentBibtex)
        .onChange(async (value) => {
          try {
              this.plugin.settings.indentBibtex = value;
              await this.plugin.saveSettings();
          } catch (e) {
              return false;
          }
        })
      );
    
    new Setting(containerEl)
      .setName('Ribbon action')
      .setDesc('Add action to ribbon (reload required).')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.addRibbonAction)
        .onChange(async (value) => {
          try {
              this.plugin.settings.addRibbonAction = value;
              await this.plugin.saveSettings();
          } catch (e) {
              return false;
          }
        })
      );
  }
}