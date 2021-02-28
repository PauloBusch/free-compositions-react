import { combineReducers } from 'redux';

import ContactReducer from './contact/ContactReducer';
import MusicsReducer from './musics/MusicsReducer';
import ArtistsReducer from './artists/ArtistsReducer';

export default combineReducers({
  contact: ContactReducer,
  musics: MusicsReducer,
  artists: ArtistsReducer
});
