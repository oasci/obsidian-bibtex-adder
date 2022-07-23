
export function addStr(str: string, index: number, str_add: string): string{
  return str.substring(0, index) + str_add + str.substring(index, str.length);
}

export function getFirstWord(title: string): string {
  // Remove all non-alphanumeric characters
  title = title.replace(/[\W_]+/g," ");
  // Remove unwanted first words.
  title = ' ' + title;  // Makes it easier for finding.
  let articles = ['and', 'the', 'a', 'an', 'of'];
  for (let i = 0; i < articles.length; i++) {
    let article = articles[i];
    title = title.replace(
      RegExp(` ${article} `, 'g'), ' '
    );
  }
  title = title.replace(/\s+/g," ");  // Unify spaces.
  let first_word = title.trim().split(" ")[0];
  return first_word;
}

export function normString(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function gscholarBibtexKey(crossrefData: any): string {
  let author_last_name = crossrefData.author[0]['family'].toLowerCase().split("-")[0];
  let year = crossrefData.published['date-parts'][0][0];
  let title = crossrefData.title[0].toLowerCase();
  let first_word = getFirstWord(title);
  let bibtex_key = author_last_name + year + first_word;
  return normString(bibtex_key);;
}