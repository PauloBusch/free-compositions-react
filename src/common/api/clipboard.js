import { toastr } from 'react-redux-toastr';

export function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.innerText = text;
  
  try {
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    
    toastr.success('Sucesso', `Cópia realizada com sucesso!`);
  } catch(err) {
    toastr.error('Erro', 'Falha ao realizar cópia!');
    throw err;
  }
}
