export function generateAddContactLink(phone) {
  if (!phone) return '';
  const numbers = phone.replace(/\D/g, '');
  return `https://wa.me/55${numbers}`;
}

export function generateSendMessageLink(phone, message) {
  if (!phone) return '';
  const numbers = phone.replace(/\D/g, '');
  return `https://web.whatsapp.com/send?phone=+55${numbers}&text=${encodeURIComponent(message)}`;
}
