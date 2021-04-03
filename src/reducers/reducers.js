import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';

import ContactReducer from '../site/reducers/contact/ContactReducer';
import MusicsReducer from './musics/MusicsReducer';
import ArtistsReducer from '../site/reducers/artists/ArtistsReducer';
import RankingReducer from './musics/RankingReducer';
import GenreReducer from '../site/reducers/genre/GenreReducer';
import PlaylistReducer from '../site/reducers/playlist/PlaylistReducer';

const rootReducer = combineReducers({
  toastr: toastrReducer,
  contact: ContactReducer,
  musics: MusicsReducer,
  artists: ArtistsReducer,
  ranking: RankingReducer,
  genres: GenreReducer,
  playlists: PlaylistReducer,
  form: formReducer
});

export default rootReducer;
