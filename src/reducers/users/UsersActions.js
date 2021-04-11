import { initialize, submit } from 'redux-form';

import { USER_FETCHED, USER_DELETED } from './UsersActionsTypes';
import { toastr } from 'react-redux-toastr';
import firebaseInstance from './../../firebase/index';
import 'firebase/firestore';

const type = 'usuário';
const formId = 'user-form';
const collection = firebaseInstance.firestore().collection('users');

export function getAll(completed) {
  return dispatch => {
    collection.get().then(result => {
      const list = result.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => b.createdAt - a.createdAt);
      dispatch({ type: USER_FETCHED, payload: list });
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
    firebaseInstance.auth().createUserWithEmailAndPassword(values.email, values.password).then(result => {
      values.createdAt = new Date();
      values.accountId = result.user.uid;
      delete values.password;
      collection.add(values)
      .then(() => {
        toastr.success('Sucesso', `Usuário cadastrado com sucesso!`);
        dispatch(getAll());
        if (completed) completed(true);
      })
      .catch(() => {
        toastr.error('Erro', `Falha ao criar ${type}!`);
        if (completed) completed(false);
      });
    })
    .catch(error => {
      switch(error.code) {
        case 'auth/email-already-in-use':
          toastr.error('Erro', `Este email já está sendo usado por outra conta!`);
          break;
        default:
          toastr.error('Erro', `Falha ao criar ${type}!`);
          break;
      }
      if (completed) completed(false);
    });
  };
}

export function update(values, completed) {
  return dispatch => {
    collection.doc(values.id).update(values)
    .then(() => {
      toastr.success('Sucesso', `Usuário atualizado com sucesso!`);
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
      dispatch({ type: USER_DELETED, payload: id });
      if (completed) completed(true);
    })
    .catch(() => {
      toastr.error('Erro', `Falha ao remover ${type}!`);
      if (completed) completed(false);
    });
  };
}
