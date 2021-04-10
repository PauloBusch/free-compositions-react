import { toastr } from 'react-redux-toastr';
import { submit } from 'redux-form';
import axios from 'axios';

import { 
  USER_FETCHED, TOKEN_VALIDATED, FORGOT_PASSWORD_EMAIL_SENDED,
  FORGOT_PASSWORD_EMAIL_LOADED, FORGOT_PASSWORD_EMAIL_LOADING 
} from './AuthActionTypes';
import { API_HOST, WEBSITE_URL } from './../../../consts';

const OAPI_URL = `${API_HOST}/oapi`;
const API_URL = `${API_HOST}/api`;

export function submitChangePassword() {
  return submit('change-password-form');
}

export function changePassword(values, success) {
  return dispatch => {
    axios.post(`${API_URL}/change-password`, values)
      .then(resp => {
        toastr.success('Sucesso', `Senha alterada com sucesso!`);
        if (success) success();
      })
      .catch(e => {
        const { invalidPassword } = e.response.data;
        if (invalidPassword)
          return toastr.error('Falha', `A senha atual não é válida!`);
        toastr.error('Erro', `Falha ao alterar senha!`);
      });
  }
}

export function changePasswordWithToken(values) {
  return dispatch => {
    axios.post(`${OAPI_URL}/change-password`, values)
      .then(resp => {
        toastr.success('Sucesso', `Senha alterada com sucesso!`);
        dispatch(logout());
      })
      .catch(e => {
        toastr.error('Erro', `Falha ao alterar senha!`);
      });
  }
}

export function forgotPassword(values) {
  return dispatch => {
    dispatch({ type: FORGOT_PASSWORD_EMAIL_LOADING });

    values.baseUrl = `${WEBSITE_URL}/#/admin/change-password`;
    axios.post(`${OAPI_URL}/forgot-password`, values)
      .then(resp => {
        toastr.success('Sucesso', `Email enviado com sucesso, verifique sua caixa de entrada!`);
        dispatch({ type: FORGOT_PASSWORD_EMAIL_SENDED });
        dispatch({ type: FORGOT_PASSWORD_EMAIL_LOADED });
      })
      .catch(e => {
        toastr.error('Erro', `Falha ao enviar email de redifinição!`);
        dispatch({ type: FORGOT_PASSWORD_EMAIL_LOADED });
      });
  }
}

export function login(values) {
  return dispatch => {
    axios.post(`${OAPI_URL}/login`, values)
      .then(resp => {
        dispatch({ type: USER_FETCHED, payload: resp.data });
      })
      .catch(e => {
        e.response.data.errors.forEach(
        error => toastr.error('Erro', error))
      });
  }
}

export function logout() {
  return dispatch => {
    dispatch({ type: TOKEN_VALIDATED, payload: false });
    window.location.href = '/#/admin';
  };
}

export function validateToken(token) {
  return dispatch => {
    if(token) {
      axios.post(`${OAPI_URL}/validate-token`, {token})
        .then(resp => {
          dispatch({ type: TOKEN_VALIDATED, payload: resp.data.valid })
        })
        .catch(e => dispatch({ type: TOKEN_VALIDATED, payload: false }))
      return;
    }
    dispatch({ type: TOKEN_VALIDATED, payload: false })
  }
}
