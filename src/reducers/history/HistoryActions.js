import { toastr } from 'react-redux-toastr';

import moment from 'moment';

import { HISTORY_FETCHED } from './HistoryActionsTypes';
import firebaseInstance from '../../firebase/index';
import 'firebase/firestore';

const collection = firebaseInstance.firestore().collection('histories');

export function getAllByFilter(filters, completed) {
  return dispatch => {
    let filtred = collection;

    if (filters) {
      const { type, createdAtDate } = filters;
      if (type)
        filtred = filtred.where('type', '==', type);
      if (createdAtDate) {
        const date = moment(createdAtDate).toDate();
        date.setHours(0, 0, 0, 0);
        filtred = filtred.where('createdAt', '>=', date);

        date.setHours(24, 0, 0, 0);
        filtred = filtred.where('createdAt', '<=', date);
      }
    }

    filtred.get().then(result => {
      const list = result.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => b.createdAt - a.createdAt);
      list.map(d => d.createdAt = d.createdAt.toDate());
      let filtred = list;
      if (filters) {
        const { createdAtHour, email, user } = filters;
        if (createdAtHour){
          const hourFormat = moment(createdAtHour, 'HH').format('HH');
          filtred = filtred.filter(h => moment(h.createdAt).format('HH') === hourFormat);
        }
        if (email)
          filtred = filtred.filter(h => h.email && h.email.search(new RegExp(email, 'i')) !== -1);
        if (user)
          filtred = filtred.filter(h => h.user && h.user.search(new RegExp(user, 'i')) !== -1);
      }
      dispatch({ type: HISTORY_FETCHED, payload: filtred });
      if (completed) completed(true, filtred);
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
