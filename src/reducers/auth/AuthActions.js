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
            redirectToLogin();
            toastr.error('Erro', 'O usuário foi removido!');
            return;
          }
          const userData = { id: doc.id, ...doc.data() };
          dispatch({ type: LOGIN, payload: userData }); 
        });
      } else {
        dispatch({ type: LOGOUT });
        if (!isAdmin) return;
        redirectToLogin();
      }        
    });
  }
}

export function login(values, completed) {
  return () => {
    firebaseInstance.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebaseInstance.auth().signInWithEmailAndPassword(values.email, values.password).then(() => {
      if (completed) completed(true);
    })
    .catch(error => {
      toastr.error('Erro', 'Usuário/Senha inválidos');
      if (completed) completed(false);
      throw error;
    });
  }
}

export function logout(completed) {
  return () => {
    firebaseInstance.auth().signOut().then(() => {
      if (completed) completed(true);
    })
    .catch(error => {
      toastr.error('Erro', 'Falha ao realizar logout');
      if (completed) completed(false);
      throw error;
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

export function changePasswordWithResetCode(code, password, completed) {
  return dispatch => {
    firebaseInstance.auth().confirmPasswordReset(code, password)
      .then(() => {
        toastr.success('Sucesso', `Senha alterada com sucesso!`);
        dispatch(logout());
        completed(true);
      })
      .catch(error => {
        toastr.error('Erro', `Falha ao alterar senha!`);
        completed(false);
        throw error;
      });
  }
}

export function validateResetCode(code, completed) {
  return () => {
    firebaseInstance.auth().verifyPasswordResetCode(code).then(email => {
      completed({ success: true, email });
    })
    .catch(error => {
      completed({ success: false });
      throw error;
    });
  }
}

export function redirectToLogin() {
  const { hash, href } = location;
  const currentHref = hash.substr(2);
  if (currentHref.indexOf('login') !== -1) return;
  const redirect = href.substr(href.indexOf('#') + 2);
  if (redirect) hashHistory.push(`/login?redirect=${encodeURIComponent(redirect)}`);
}
