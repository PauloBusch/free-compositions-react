import { toastr } from 'react-redux-toastr';

import firebaseInstance from './../../../firebase/index';
import firebase from 'firebase';
import { LOGIN, LOGOUT, LOADING } from './AuthActionTypes';

export function listenSessionChanged() {
  return dispatch => {
    dispatch({ type: LOADING });
    firebaseInstance.auth().onAuthStateChanged(user => {
        if (user)
          dispatch({ type: LOGIN, payload: { id: user.uid, email: user.email } }); 
        else {
          dispatch({ type: LOGOUT });
          window.location.href = '/#/admin';
        }        
      }
    );
  }
}

export function login(values) {
  return () => {
    firebaseInstance.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebaseInstance.auth().signInWithEmailAndPassword(values.email, values.password).then(() => { })
    .catch(e => {
      toastr.error('Erro', 'Usuário/Senha inválidos');
    });
  }
}

export function logout() {
  return () => {
    firebaseInstance.auth().signOut().then(() => { })
    .catch(e => {
      toastr.error('Erro', 'Falha ao realizar logout');
    });
  }
}
