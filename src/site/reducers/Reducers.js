import { combineReducers } from 'redux';

import ContactReducer from './contact/ContactReducer';
import MusicsReducer from './musics/MusicsReducer';

export default combineReducers({
  contact: ContactReducer,
  musics: MusicsReducer
});
