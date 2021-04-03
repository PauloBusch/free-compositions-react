export default function password(value) {
  if (!value) return undefined;
  if (!/[0-9]/.test(value)) return 'A senha deve ter caracteres numéricos';
  if (!/[!@#\$%\^&]/.test(value)) return 'A senha deve ter caracteres especiais';
  if (!/[A-Z]/.test(value)) return 'A senha deve ter caracteres em maiúsculo';
  if (!/[a-z]/.test(value)) return 'A senha deve ter caracteres em minúsculo';
  if (value.length < 8) return 'A senha deve ter pelo menos 8 caracteres';
  return undefined;
}
