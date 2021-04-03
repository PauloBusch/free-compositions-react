export default function required(value) {
  if ([null, undefined, ''].indexOf(value) !== -1) return 'O campo é obrigatório';
  return undefined;
}
