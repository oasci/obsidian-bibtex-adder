# Obsidian BibTeX Adder

**Not maintained:** This plugin is no longer maintained and has been incorporated into [citater](https://gitlab.com/oasci/software/obsidian-citater-plugin).

Add BibTeX entries from DOIs using the [Crossref REST API](https://www.crossref.org/documentation/retrieve-metadata/rest-api/).

## Usage

Ideally, this plugin should be paired with the [Citation](https://github.com/hans/obsidian-citation-plugin) plugin when an external reference manage (e.g., Mendeley, EndNote, Zotero, etc.) is not being used.
This plugin essentially acts as a reference importer by providing a simple way to add BibTeX entries from DOIs.

- Adds a command, ``Add BibTeX entry from DOI``, that prompts the user for a DOI, retrieves the BibTex entry, then adds it to a bib file within the vault.

Currently, only the Google scholar citation key format is used to generate BibBtex entries.

## Installation

Download `main.js` and `manifest.json` from [the latest release](https://github.com/oasci/obsidian-bibtex-adder/releases) and move them to your vault at `.obsidian/plugins/obsidian-bibtex-adder`.

## License

Distributed under the MIT License.
See `LICENSE` for more information.
