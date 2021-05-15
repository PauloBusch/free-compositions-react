export default function oneOrMore(value) {
  if ([null, undefined, ''].indexOf(value) !== -1) return undefined;
  const number = parseInt(value);
  if (!isNaN(number) && number <= 0) return 'O número informado deve ser maior ou igual a um';
  return undefined;
}
