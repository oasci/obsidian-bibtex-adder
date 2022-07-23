import { App, Modal, Setting, Notice, normalizePath, TFile } from 'obsidian';
import { getBibtex } from './retrieve';
import { addStr } from './utils';

export class BibtexAdderModal extends Modal {
  doiValue: string;
  settings: any;

  constructor(
    app: App,
    settings: any
  ) {
    super(app);
    this.settings = settings;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h1", { text: "Add BibTeX entry from DOI" });

    new Setting(contentEl).setName("DOI").addText((text) =>
      text.setValue(this.doiValue).onChange((value) => {
        this.doiValue = value;
      })
    );

    new Setting(contentEl).addButton((btn) =>
      btn
        .setButtonText("Add")
        .setCta()
        .onClick(async () => {
          this.close();

          let bibtex_path = this.settings.bibtexLocation;

          // Get BibTex data
          var [ bibtex_key, bibtex_string ] = await getBibtex(this.doiValue);

          // Indent BibTeX string
          if (this.settings.indentBibtex) {
            bibtex_string = bibtex_string.replace(
              RegExp(`{${bibtex_key}, title=`, 'g'), `{${bibtex_key},\n  title=`
            )
            bibtex_string = bibtex_string.replace(
              RegExp(`},`, 'g'), `},\n  `
            )
            bibtex_string = addStr(
              bibtex_string, bibtex_string.length-2,
              `\n`
            )
          }

          // Get BibTeX file.
          let bibtexFile = this.app.vault.getAbstractFileByPath(
            normalizePath(bibtex_path)
          ) as TFile;
          
          if (bibtexFile == null) {
            // Create file with BibTeX entry if it does not already exist.
            this.app.vault.create(bibtex_path, bibtex_string);
            new Notice("Created BibTeX file.")
            new Notice(`Added ${bibtex_key}.`)
          } else {
            // File exists.
            // Check if BibTeX key already exists.
            var bibtex_content = await this.app.vault.read(bibtexFile)
            if (bibtex_content.includes(`{${bibtex_key},`)) {
              new Notice(`${bibtex_key} already exists.`)
            } else {
              // Append BibTeX entry.
              this.app.vault.append(bibtexFile, bibtex_string)
              new Notice(`Added ${bibtex_key}.`)
            }
          }
        })
    );
  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
}
