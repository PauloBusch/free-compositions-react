import { toastr } from 'react-redux-toastr';

import { HISTORY_FETCHED } from './HistoryActionsTypes';
import firebaseInstance from '../../firebase/index';
import 'firebase/firestore';

const collection = firebaseInstance.firestore().collection('histories');

export function getAllByFilter(filters, completed) {
  return dispatch => {
    let filtred = collection;

    if (filters) {
      if (filters.type)
        filtred = filtred.where('type', '==', filters.type);
    }

    filtred.get().then(result => {
      const list = result.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => b.createdAt - a.createdAt);
      list.map(d => d.createdAt = d.createdAt.toDate());
      dispatch({ type: HISTORY_FETCHED, payload: list });
      if (completed) completed(true);
    })
    .catch((error) => {
      toastr.error('Erro', `Falha ao carregar histórico!`);
      if (completed) completed(false);
      throw error;
    });
  };
}

export function register(values, user, type) {
  return () => {
    values.type = type;
    values.user = user;
    values.createdAt = new Date();
    collection.add(values)
      .then(() => { })
      .catch((error) => {
        toastr.error('Erro', `Falha ao registrar histórico!`);
        throw error;
      });
  };
}
