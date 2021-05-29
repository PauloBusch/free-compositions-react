export function extractTextFromHtml(html) {
  if (!html) return '';
  const regex = /(<([^>]+)>)/ig;
  return html.replace(regex, '');
}

export function removeScripts(html) {
  if (!html) return '';
  return html
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/(<? *script)/gi, 'illegalscript');
}
