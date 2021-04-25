export function getYoutubeID(url) {
  const param = 'v=';
  return url.substr(url.indexOf(param) + param.length, 11);
}

export function getYoutubeLink(url) {
  if (!url) return null;
  const youtubeId = getYoutubeID(url);
  return `https://www.youtube.com/embed/${youtubeId}?rel=0&controls=0`;
}
