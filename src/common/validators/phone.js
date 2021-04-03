export default function phone(value) {
  const regex = /^[(]{0,1}[0-9]{2}[)]{0,1}[-\s\.]{0,1}[0-9]{4,5}[-\s\.]{0,1}[0-9]{4}$/;
  if (!value) return undefined;
  if (!regex.test(value)) return 'O telefone deve ser válido';
  return undefined;
}
