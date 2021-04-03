import { initialize, submit } from 'redux-form';

import { MUSIC_FETCHED, MUSIC_DELETED } from './MusicsActionsTypes';

const formId = 'music-form';
const list = [
  {
    id: 1,
    image: 'images/artists/artist-1.jpg',
    compositor: '$r L1l.',
    name: 'Mi dama'
  },
  {
    id: 2,
    image: 'images/artists/artist-2.jpg',
    compositor: 'Fbrício Brasílio',
    name: 'Chernobil'
  },
  {
    id: 3,
    image: 'images/artists/artist-3.jpg',
    compositor: 'Joana Antonio',
    name: 'Eis me aqui'
  },
  {
    id: 4,
    image: 'images/artists/artist-1.jpg',
    compositor: '$r L1l.',
    name: 'Mi dama'
  },
  {
    id: 5,
    image: 'images/artists/artist-2.jpg',
    compositor: 'Fbrício Brasílio',
    name: 'Chernobil'
  },
  {
    id: 6,
    image: 'images/artists/artist-3.jpg',
    compositor: 'Joana Antonio',
    name: 'Eis me aqui'
  }
];

export function getAll() {
  return { type: MUSIC_FETCHED, payload: list };
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
    dispatch({ type: MUSIC_DELETED, payload: id });
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
