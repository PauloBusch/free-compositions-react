export default function requiredTextEditor(value) {
  const error = 'O campo é obrigatório';
  if ([null, undefined, ''].indexOf(value) !== -1) return error;
  const text = value.replace(/(<([^>]+)>|\n)/ig, '');
  if ([null, undefined, ''].indexOf(text) !== -1) return error;
  return undefined;
}
