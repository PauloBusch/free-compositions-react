import { 
  USER_FETCHED, TOKEN_VALIDATED, FORGOT_PASSWORD_EMAIL_SENDED, 
  FORGOT_PASSWORD_EMAIL_LOADED, FORGOT_PASSWORD_EMAIL_LOADING 
} from './AuthActionTypes';

const userKey = 'application-user';
const INITIAL_STATE = {
  user: getLocalUser(),
  validToken: false,
  validatedToken: false,
  sendedForgotPasswordEmail: false,
  sendedForgotPasswordEmailLoading: false
};

function getLocalUser() {
  const localUser = localStorage.getItem(userKey);
  if (!localUser) return null;
  return JSON.parse(localUser);
}

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOKEN_VALIDATED:
      if(action.payload) return { ...state, validToken: true, validatedToken: true };
      localStorage.removeItem(userKey);
      return { ...state, validToken: false, validatedToken: true, user: null };
    case USER_FETCHED:
      localStorage.setItem(userKey, JSON.stringify(action.payload));
      return { ...state, user: action.payload, validToken: true };
    case FORGOT_PASSWORD_EMAIL_SENDED:
      return { ...state, sendedForgotPasswordEmail: true };
    case FORGOT_PASSWORD_EMAIL_LOADING:
      return { ...state, sendedForgotPasswordEmailLoading: true };
    case FORGOT_PASSWORD_EMAIL_LOADED:
      return { ...state, sendedForgotPasswordEmailLoading: false };
    default:
      return state;
  }
}
