import { toastr } from 'react-redux-toastr';

import { hashHistory } from 'react-router';
import firebaseInstance from '../../firebase/index';
import firebase from 'firebase/app';
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
              dispatch(logout());
              hashHistory.push('/login');
              toastr.error('Erro', 'O usuário foi removido!');
              return;
            }
            const userData = { id: doc.id, ...doc.data() };
            dispatch({ type: LOGIN, payload: userData }); 
          });
        } else {
          dispatch({ type: LOGOUT });
          if (!isAdmin) return;
          hashHistory.push('/login');
        }        
      }
    );
  }
}

export function login(values, completed) {
  return () => {
    firebaseInstance.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebaseInstance.auth().signInWithEmailAndPassword(values.email, values.password).then(() => {
      if (completed) completed(true);
    })
    .catch(e => {
      toastr.error('Erro', 'Usuário/Senha inválidos');
      if (completed) completed(false);
    });
  }
}

export function logout(completed) {
  return () => {
    firebaseInstance.auth().signOut().then(() => {
      if (completed) completed(true);
    })
    .catch(e => {
      toastr.error('Erro', 'Falha ao realizar logout');
      if (completed) completed(false);
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
    .catch((error) => {
      toastr.error('Erro', `Falha ao enviar email de redifinição!`);
      dispatch({ type: FORGOT_PASSWORD_EMAIL_LOADED });
      throw error;
    });
  }
}
