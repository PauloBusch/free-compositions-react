import { initialize, submit } from 'redux-form';

import { LETTER_FETCHED, LETTER_DELETED } from './LettersActionsTypes';

const formId = 'letter-form';
const list = [
  {
    id: 1,
    genre: 'Pop',
    style: 'Estilo 2',
    name: 'Mi dama',
    compositor: '$r L1l.',
    letter: `Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, 
      e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e 
      os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, 
      como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. 
      Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, 
      e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.`
  },
  {
    id: 2,
    genre: 'Eletrônica',
    style: 'Estilo 1',
    name: 'Chernobil',
    compositor: 'Fbrício Brasílio',
    letter: `Ut sit amet turpis felis. Praesent pharetra congue massa, sed ornare erat imperdiet ut. 
      Sed id magna quis magna ultrices pharetra at a nunc. Nulla eget dapibus ex. Integer ultrices molestie 
      maximus. Cras ac erat tempor, tristique dui ut, dapibus nunc. Duis nisi turpis, venenatis et 
      faucibus id, ultricies ac ex. Sed eu velit et nisi laoreet finibus ut et quam. Vestibulum facilisis 
      faucibus velit, sit amet semper nunc consectetur quis. Proin nec scelerisque risus. Donec hendrerit 
      porttitor ligula nec ultricies. Sed pulvinar vehicula elit, eu dictum lorem dapibus nec. 
      Donec molestie neque ut ligula tempo`
  },
  {
    id: 3,
    name: 'Eis me aqui',
    style: 'Estilo 2',
    genre: 'MPB',
    compositor: 'Joana Antonio',
    letter: `Aliquam erat volutpat. Aenean eget sodales felis. Nullam neque magna, pulvinar a lectus sit amet, 
      mattis volutpat mi. Proin rutrum varius turpis nec placerat. Vivamus ullamcorper id risus et maximus. 
      Vivamus mattis augue sed augue mattis, in convallis orci ultricies. Duis tellus odio, finibus et massa 
      quis, dictum malesuada lacus. Sed ac neque leo. Pellentesque feugiat odio mauris, quis pharetra 
      orci fermentum ac.`
  }
];

export function getAll() {
  return { type: LETTER_FETCHED, payload: list };
}

export function loadForm(id) {
  return dispatch => {
    const data = list.find(l => l.id == id);
    dispatch(initialize(formId, data));
  };
}

export function submitForm() {
  return submit(formId);
}

export function create(values) {
  return request(values, 'post');
}

export function update(values) {
  return request(values, 'put');
}

export function remove(id) {
  return dispatch => {
    dispatch({ type: LETTER_DELETED, payload: id });
  };
}

function request(values, method) {
  return dispatch => {
    if (method === 'post') {
      values.id = getMaxId() + 1;
      list.unshift(values);
    }
    if (method === 'put') {
      const index = list.indexOf(l => l.id === values.id);
      list[index] = values;
    }
    dispatch(getAll());
  };
}

function getMaxId() {
  let max = list[0].id;
  for (const data of list) {
    if (data.id > max)
      max = data.id;
  }
  return max;
}
