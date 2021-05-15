export default function integer(value) {
  const regex = /^\d+$/;
  if ([null, undefined, ''].indexOf(value) !== -1) return undefined;
  if (!regex.test(value)) return 'O número informado deve ser inteiro';
  return undefined;
}
