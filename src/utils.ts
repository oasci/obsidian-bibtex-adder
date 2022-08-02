
export function addStr(str: string, index: number, str_add: string): string{
  return str.substring(0, index) + str_add + str.substring(index, str.length);
}

/**
 * Retrieves first word of a string.
 * @param str String containing one or more words. Should not contain any 
 * accentuated characters.
 * @returns First word of str
 */
export function getFirstWord(str: string): string {
  // Remove all non-alphanumeric characters
  str = str.replace(/[\W_]+/g," ");
  // Remove unwanted first words.
  str = ' ' + str;  // Makes it easier for finding.
  let articles = [
    'a', 'i', 'of', 'to', 'in', 'it', 'is', 'be', 'as', 'at', 'by', 'or', 'on',
    'do', 'if', 'an', 'the', 'and', 'are', 'but', 'can', 'its', 'that', 'this'
  ];
  for (let i = 0; i < articles.length; i++) {
    let article = articles[i];
    str = str.replace(
      RegExp(` ${article} `, 'g'), ' '
    );
  }
  str = str.replace(/\s+/g," ");  // Unify spaces.
  let first_word = str.trim().split(" ")[0];
  return first_word;
}

/**
 * Remove accented characters in a string.
 * @param str Any string.
 * @returns String with all accented characters replaced with nonaccented ones.
 */
export function normString(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function gscholarBibtexKey(crossrefData: any): string {
  let author_last_name = crossrefData.author[0]['family'].toLowerCase();
  author_last_name = normString(author_last_name);
  author_last_name = getFirstWord(author_last_name);
  let year = crossrefData.published['date-parts'][0][0];
  let title = crossrefData.title[0].toLowerCase();
  let title_first_word = getFirstWord(title);
  let bibtex_key = author_last_name + year + title_first_word;
  return normString(bibtex_key);
}