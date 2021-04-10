import { 
  LOGIN, LOGOUT, LOADING, 
  FORGOT_PASSWORD_EMAIL_LOADED,
  FORGOT_PASSWORD_EMAIL_LOADING,
  FORGOT_PASSWORD_EMAIL_SENDED 
} from './AuthActionTypes';

const INITIAL_STATE = {
  user: null, 
  loading: true,
  forgotPasswordEmailSended: false,
  forgotPasswordEmailLoading: false
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case LOGIN:
      return { ...state, user: action.payload, loading: false };
    case LOGOUT:
      return { ...state, user: null, loading: false };
    case FORGOT_PASSWORD_EMAIL_SENDED:
      return { ...state, forgotPasswordEmailSended: true };
    case FORGOT_PASSWORD_EMAIL_LOADING:
      return { ...state, forgotPasswordEmailLoading: true };
    case FORGOT_PASSWORD_EMAIL_LOADED:
      return { ...state, forgotPasswordEmailLoading: false };
    default:
      return state;
  }
}
