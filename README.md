# Obsidian BibTeX Adder

Add BibTeX entries from DOIs using the [Crossref REST API](https://www.crossref.org/documentation/retrieve-metadata/rest-api/).

## Usage

Ideally, this plugin should be paired with the [Citation](https://github.com/hans/obsidian-citation-plugin) plugin when an external reference manage (e.g., Mendeley, EndNote, Zotero, etc.) is not being used.
This plugin essentially acts as a reference importer by providing a simple way to add BibTeX entries from DOIs.

- Adds a command, ``Add BibTeX entry from DOI``, that prompts the user for a DOI, retrieves the BibTex entry, then adds it to a bib file within the vault.

Currently, only the Google scholar citation key format is used to generate BibBtex entries.

## Installation

- Clone this repo (``git clone github.com/aalexmmaldonado/obsidian-bibtex-adder``).
- `npm i` or `yarn` to install dependencies.
- `npm run dev` to compile.
- Copy `main.js` and `manifest.json` into your vault in `.obsidian/plugins/obsidian-bibtex-adder`.

## License

Distributed under the MIT License.
See `LICENSE` for more information.
