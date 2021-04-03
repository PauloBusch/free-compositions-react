import { initialize, submit } from 'redux-form';

import { USER_FETCHED, USER_DELETED } from './UsersActionsTypes';

const formId = 'user-form';
const list = [
  {
    id: 1,
    name: 'Paulo',
    email: 'paulo@email.com',
    role: 'Admin'
  },
  {
    id: 2,
    name: 'Glauber',
    email: 'glauber@email.com',
    role: 'Admin'
  },
  {
    id: 3,
    name: 'Pedro',
    email: 'pedro@email.com',
    role: 'Compositor'
  },
  {
    id: 4,
    name: 'Marcos',
    email: 'marcos@email.com',
    role: 'Compositor'
  }
];

export function getAll() {
  return { type: USER_FETCHED, payload: list };
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
    dispatch({ type: USER_DELETED, payload: id });
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
