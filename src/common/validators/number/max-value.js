export default function maxValue(final) {
  return function(value) {
    const regex = /^\d+$/;
    if ([null, undefined, ''].indexOf(value) !== -1) return false;
    if (!regex.test(value)) return false;

    const number = parseInt(value);
    if (number > final) return `O valor deve ser menor ou igual a ${final}`;
    return false;
  }
}
