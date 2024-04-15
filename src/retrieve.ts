import axios from 'axios';
import { Notice } from 'obsidian';
import { gscholarBibtexKey } from './utils';

// Creates BibTeX content from crossref information
export async function getBibtex(doi: string): Promise<[string, string]> {
  const crossrefData = await retrieveCrossref(doi);
  let bibtex_string = await retrieveBibtex(doi);

  console.log(crossrefData);

  // Change to google scholar bibtex key
  const bibtex_key = gscholarBibtexKey(crossrefData);
  const year = crossrefData.published['date-parts'][0][0];
  bibtex_string = bibtex_string.replace(
    RegExp(`{${year}, title=`, ""), `{${bibtex_key}, title=`
  );

  // Ensure BibTeX does not start with a space
  bibtex_string = bibtex_string.replace(
    RegExp(` @`, ""), `@`
  );

  // Remove abstract
  const abstractRegex = /abstract\s*=\s*{[^{}]*}/;
  bibtex_string = bibtex_string.replace(abstractRegex, '');

  // Make BibTeX keys lowercase.
  bibtex_string = bibtex_string.replace(`DOI=`, 'doi=');
  bibtex_string = bibtex_string.replace(`ISSN=`, 'issn=');

  bibtex_string = `\n` + bibtex_string
  return [ bibtex_key, bibtex_string ];
}

export async function retrieveCrossref(doi: string) {
  try {
    const response = await axios.get(
      'https://api.crossref.org/works/' + doi
    );
    return response.data.message;
  } catch (error) {
    new Notice("Error retrieving Crossref work")
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

export async function retrieveBibtex(doi: string) {
  try {
    const response = await axios.get('https://doi.org/' + doi, {
      headers: {
        'Accept': 'text/bibliography; style=bibtex'
      }
    });
    return response.data
  } catch (error) {
    new Notice("Error retrieving Crossref work")
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}
