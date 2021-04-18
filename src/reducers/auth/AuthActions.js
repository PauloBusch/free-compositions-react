import { toastr } from 'react-redux-toastr';

import { hashHistory } from 'react-router';
import firebaseInstance from '../../firebase/index';
import firebase from 'firebase';
import { 
  LOGIN, LOGOUT, LOADING, 
  FORGOT_PASSWORD_EMAIL_LOADED,
  FORGOT_PASSWORD_EMAIL_LOADING,
  FORGOT_PASSWORD_EMAIL_SENDED 
} from './AuthActionsType';

export function listenSessionChanged(isAdmin) {
  return dispatch => {
    dispatch({ type: LOADING });
    firebaseInstance.auth().onAuthStateChanged(user => {
        if (user) {
          firebaseInstance.firestore().collection('users').where('accountId', '==', user.uid).get().then(result => {
            const [doc] = result.docs;
            if (!doc) {
              dispatch({ type: LOGOUT });
              hashHistory.push('/login');
              toastr.error('Erro', 'O usuário foi removido!');
              return;
            }
            const userData = { id: doc.id, ...doc.data() };
            dispatch({ type: LOGIN, payload: userData }); 
          });
        } else {
          if (!isAdmin) return;
          dispatch({ type: LOGOUT });
          hashHistory.push('/login');
        }        
      }
    );
  }
}

export function login(values) {
  return () => {
    firebaseInstance.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebaseInstance.auth().signInWithEmailAndPassword(values.email, values.password).then()
    .catch(e => {
      toastr.error('Erro', 'Usuário/Senha inválidos');
    });
  }
}

export function logout() {
  return () => {
    firebaseInstance.auth().signOut().then()
    .catch(e => {
      toastr.error('Erro', 'Falha ao realizar logout');
    });
  }
}

export function forgotPassword(values) {
  return dispatch => {
    dispatch({ type: FORGOT_PASSWORD_EMAIL_LOADING });

    firebaseInstance.auth().sendPasswordResetEmail(values.email).then(() => {
      toastr.success('Sucesso', `Email enviado com sucesso, verifique sua caixa de entrada!`);
      dispatch({ type: FORGOT_PASSWORD_EMAIL_SENDED });
      dispatch({ type: FORGOT_PASSWORD_EMAIL_LOADED });
    })
    .catch(() => {
      toastr.error('Erro', `Falha ao enviar email de redifinição!`);
      dispatch({ type: FORGOT_PASSWORD_EMAIL_LOADED });
    });
  }
}
