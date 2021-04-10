import { LOGIN, LOGOUT, LOADING } from './AuthActionTypes';

export default function authReducer(state = { user: null, loading: true }, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case LOGIN:
      return { ...state, user: action.payload, loading: false };
    case LOGOUT:
      return { ...state, user: null, loading: false };
    default:
      return state;
  }
}
