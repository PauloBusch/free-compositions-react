import { initialize, submit } from 'redux-form';

import { GENRE_FETCHED, GENRE_DELETED } from './GenresActionsTypes';

const formId = 'genre-form';
const list = [
  {
    id: 1,
    name: 'Gospel',
    color: '#ffaa00'
  },
  {
    id: 2,
    name: 'Rap',
    color: '#00ffb1'
  },
  {
    id: 3,
    name: 'Música eletrônica',
    color: '#00d3ff'
  },
  {
    id: 4,
    name: 'Pop',
    color: '#f700ff'
  },
  {
    id: 5,
    name: 'Gospel',
    color: '#ffaa00'
  },
  {
    id: 6,
    name: 'Rap',
    color: '#00ffb1'
  }
];

export function getAll() {
  return { type: GENRE_FETCHED, payload: list };
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
    dispatch({ type: GENRE_DELETED, payload: id });
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
