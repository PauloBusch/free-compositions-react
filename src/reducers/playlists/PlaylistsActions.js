import { initialize, submit } from 'redux-form';

import { PLAYLIST_FETCHED, PLAYLIST_DELETED } from './PlaylistsActionsTypes';
import { toastr } from 'react-redux-toastr';
import firebaseInstance from './../../firebase/index';
import 'firebase/firestore';

const type = 'playlist';
const formId = 'playlist-form';
const collection = firebaseInstance.firestore().collection('playlists');

export function getAll(completed) {
  return dispatch => {
    collection.get().then(result => {
      const list = result.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => b.createdAt - a.createdAt);
      dispatch({ type: PLAYLIST_FETCHED, payload: list });
      completed(true);
    })
    .catch(() => {
      toastr.error('Erro', `Falha ao carregar ${type}s!`);
      completed(false);
    });
  };
}

export function loadForm(id) {
  return dispatch => {
    collection.doc(id).get().then(doc => {
      dispatch(initialize(formId, { id: doc.id, ...doc.data() }));
    })
    .catch(() => toastr.error('Erro', `Falha ao carregar ${type}!`));
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
      toastr.success('Sucesso', `Playlist cadastrada com sucesso!`);
      dispatch(getAll());
      completed(true);
    })
    .catch(() => {
      toastr.error('Erro', `Falha ao criar ${type}!`);
      completed(false);
    });
  };
}

export function update(values, completed) {
  return dispatch => {
    collection.doc(values.id).update(values)
    .then(() => {
      toastr.success('Sucesso', `Playlist atualizada com sucesso!`);
      dispatch(getAll());
      completed(true);
    })
    .catch(() => {
      toastr.error('Erro', `Falha ao atualizar ${type}!`);
      completed(false);
    });
  };
}

export function remove(id, completed) {
  return dispatch => {
    collection.doc(id).delete().then(doc => {
      dispatch({ type: PLAYLIST_DELETED, payload: id });
      completed(true);
    })
    .catch(() => {
      toastr.error('Erro', `Falha ao remover ${type}!`);
      completed(false);
    });
  };
}
