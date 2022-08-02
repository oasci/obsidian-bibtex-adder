
export function addStr(str: string, index: number, str_add: string): string{
  return str.substring(0, index) + str_add + str.substring(index, str.length);
}

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

export function normString(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function gscholarBibtexKey(crossrefData: any): string {
  let author_last_name = getFirstWord(
    crossrefData.author[0]['family'].toLowerCase()
  );
  let year = crossrefData.published['date-parts'][0][0];
  let title = crossrefData.title[0].toLowerCase();
  let title_first_word = getFirstWord(title);
  let bibtex_key = author_last_name + year + title_first_word;
  return normString(bibtex_key);;
}