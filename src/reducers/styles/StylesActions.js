import { initialize, submit } from 'redux-form';

import { STYLE_FETCHED, STYLE_DELETED } from './StylesActionsTypes';

const formId = 'style-form';
const list = [
  {
    id: 1,
    name: 'Estilo 1'
  },
  {
    id: 2,
    name: 'Estilo 2'
  }
];

export function getAll() {
  return { type: STYLE_FETCHED, payload: list };
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
    dispatch({ type: STYLE_DELETED, payload: id });
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
