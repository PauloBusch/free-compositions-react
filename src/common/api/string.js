export function toTitleCase(text) {
  if (!text) return;
  let titleCase = [...text];
  titleCase[0] = titleCase[0].toUpperCase();
  return titleCase.join('');
}
