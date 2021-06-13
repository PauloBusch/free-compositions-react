export default function minValue(initial) {
  return function(value) {
    const regex = /^\d+$/;
    if ([null, undefined, ''].indexOf(value) !== -1) return false;
    if (!regex.test(value)) return false;

    const number = parseInt(value);
    if (number < initial) return `O valor deve ser maior ou igual a ${initial}`;
    return false;
  }
}
