export function randBackgroundColor() {
  const letters = '0123456789ABCDEF';
  let color;
  do {
    color = '#';
    for (let i = 0; i < 6; i++)
      color += letters[Math.floor(Math.random() * 16)];
  } while (parseInt(color.replace('#', ''), 16) > 0xffffff / 2);
  return color;
}
