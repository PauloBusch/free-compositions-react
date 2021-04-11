import { initialize, submit } from 'redux-form';

import { GENRE_FETCHED, GENRE_DELETED } from './GenresActionsTypes';
import { toastr } from 'react-redux-toastr';
import firebaseInstance from './../../firebase/index';
import 'firebase/firestore';

const type = 'gênero';
const formId = 'genre-form';
const collection = firebaseInstance.firestore().collection('genres');

export function getAll(completed) {
  return dispatch => {
    collection.get().then(result => {
      const list = result.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => b.createdAt - a.createdAt);
      dispatch({ type: GENRE_FETCHED, payload: list });
      if (completed) completed(true);
    })
    .catch(() => {
      toastr.error('Erro', `Falha ao carregar ${type}s!`);
      if (completed) completed(false);
    });
  };
}

export function loadForm(id, completed) {
  return dispatch => {
    collection.doc(id).get().then(doc => {
      dispatch(initialize(formId, { id: doc.id, ...doc.data() }));
      if (completed) completed(true);
    })
    .catch(() => { 
      toastr.error('Erro', `Falha ao carregar ${type}!`); 
      if (completed) completed(false);
    });
  };
}

export function submitForm() {
  return submit(formId);
}

export function create(values, completed) {
  return dispatch => {
    values.createdAt = new Date();
    collection.add(values)
    .then(() => {
      toastr.success('Sucesso', `Gênero cadastrado com sucesso!`);
      dispatch(getAll());
      if (completed) completed(true);
    })
    .catch(() => {
      toastr.error('Erro', `Falha ao criar ${type}!`);
      if (completed) completed(false);
    });
  };
}

export function update(values, completed) {
  return dispatch => {
    collection.doc(values.id).update(values)
    .then(() => {
      toastr.success('Sucesso', `Gênero atualizado com sucesso!`);
      dispatch(getAll());
      if (completed) completed(true);
    })
    .catch(() => {
      toastr.error('Erro', `Falha ao atualizar ${type}!`);
      if (completed) completed(false);
    });
  };
}

export function remove(id, completed) {
  return dispatch => {
    collection.doc(id).delete().then(doc => {
      dispatch({ type: GENRE_DELETED, payload: id });
      if (completed) completed(true);
    })
    .catch(() => {
      toastr.error('Erro', `Falha ao remover ${type}!`);
      if (completed) completed(false);
    });
  };
}
