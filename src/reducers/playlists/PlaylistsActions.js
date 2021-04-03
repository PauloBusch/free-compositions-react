import { initialize, submit } from 'redux-form';

import { PLAYLIST_FETCHED, PLAYLIST_DELETED } from './PlaylistsActionsTypes';

const formId = 'playlist-form';
const list = [
  {
    id: 1,
    name: 'TOP 50 SERTANEJO',
    image: 'images/playlist/sertanejo.jpg'
  },
  {
    id: 2,
    name: 'BEAT TRAP FUNK',
    image: 'images/playlist/funk.jpg'
  },
  {
    id: 3,
    name: 'GOSPEL',
    image: 'images/playlist/gospel.jpg'
  },
  {
    id: 4,
    name: 'ELETRÕNICA',
    image: 'images/playlist/eletronic.jpg'
  },
  {
    id: 5,
    name: 'TOP 50 SERTANEJO',
    image: 'images/playlist/sertanejo.jpg'
  },
  {
    id: 6,
    name: 'BEAT TRAP FUNK',
    image: 'images/playlist/funk.jpg'
  }
];

export function getAll() {
  return { type: PLAYLIST_FETCHED, payload: list };
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
    dispatch({ type: PLAYLIST_DELETED, payload: id });
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
