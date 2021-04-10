import { initialize, submit } from 'redux-form';

import { SLIDE_FETCHED, SLIDE_DELETED } from './SlidesActionsTypes';

const formId = 'slide-form';
const list = [
  { id: 1, image: 'images/slides/slide-1.jpeg', positionX: 'right', positionY: 'center' },
  { id: 2, image: 'images/slides/slide-2.jpeg', positionX: 'right', positionY: 'center' },
  { id: 3, image: 'images/slides/slide-3.jpeg', positionX: 'right', positionY: 'center' }
];

export function getAll() {
  return { type: SLIDE_FETCHED, payload: list };
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
    dispatch({ type: SLIDE_DELETED, payload: id });
  };
}

function request(values, method) {
  return dispatch => {
    if (method === 'post') {
      values.id = getMaxId() + 1;
      list.unshift(values);
    }
    if (method === 'put') {
      const record = list.find(l => l.id === values.id);
      const index = list.indexOf(record);
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
