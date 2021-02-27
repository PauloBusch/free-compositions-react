import { combineReducers } from 'redux';

import ContactReducer from './contact/ContactReducer';

export default combineReducers({
  contact: ContactReducer
});
