import { initialize, submit } from 'redux-form';

import { LETTER_FETCHED, LETTER_DELETED } from './LettersActionsTypes';import { toastr } from 'react-redux-toastr';
import firebaseInstance from './../../firebase/index';
import 'firebase/firestore';

const type = 'letra';
const formId = 'letter-form';
const collection = firebaseInstance.firestore().collection('letters');

export function getAll(completed) {
  return dispatch => {
    collection.get().then(result => {
      const list = result.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => b.order - a.order);
      dispatch({ type: LETTER_FETCHED, payload: list });
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
    collection.orderBy('order', 'desc').limit(1).get().then(doc => { 
      const maxOrder = doc.size > 0 ? doc.docs[0].data().order : 0;
      values.createdAt = new Date();
      values.order = maxOrder + 1;
      collection.add(values)
      .then(() => {
        toastr.success('Sucesso', `Letra cadastrada com sucesso!`);
        dispatch(getAll());
        if (completed) completed(true);
      })
      .catch(() => {
        toastr.error('Erro', `Falha ao criar ${type}!`);
        if (completed) completed(false);
      });
    });
  };
}

export function update(values, completed) {
  return dispatch => {
    collection.doc(values.id).update(values)
    .then(() => {
      toastr.success('Sucesso', `Letra atualizada com sucesso!`);
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
      dispatch({ type: LETTER_DELETED, payload: id });
      if (completed) completed(true);
    })
    .catch(() => {
      toastr.error('Erro', `Falha ao remover ${type}!`);
      if (completed) completed(false);
    });
  };
}

export function updateOrderBulk(list) {
  return dispatch => {
    var batch = firebaseInstance.firestore().batch();

    for (const item of list) {
      const record = collection.doc(item.id);
      batch.update(record, { order: item.order });
    }
    
    return batch.commit().then(() => {
      toastr.success('Sucesso', `Ordem atualizada com sucesso!`);
      dispatch(getAll());
    })
    .catch(() => {
      toastr.error('Erro', `Falha ao atualizar ordem!`);
    });
  };
}
