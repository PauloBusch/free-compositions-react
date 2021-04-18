import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';

import ContactReducer from '../site/reducers/contact/ContactReducer';
import MusicsReducer from './musics/MusicsReducer';
import ArtistsReducer from '../site/reducers/artists/ArtistsReducer';
import RankingReducer from './musics/RankingReducer';
import PlaylistReducer from './playlists/PlaylistsReducer';
import LetterReducer from './letters/LettersReducer';
import UserReducer from './users/UsersReducer';
import GenreReducer from './genres/GenresReducer';
import StyleReducer from './styles/StylesReducer';
import SlidesReducer from './slides/SlidesReducer';
import authReducer from './auth/AuthReducer';

const rootReducer = combineReducers({
  toastr: toastrReducer,
  contact: ContactReducer,
  auth: authReducer,
  slides: SlidesReducer,
  musics: MusicsReducer,
  artists: ArtistsReducer,
  ranking: RankingReducer,
  playlists: PlaylistReducer,
  letters: LetterReducer,
  users: UserReducer,
  genres: GenreReducer,
  styles: StyleReducer,
  form: formReducer
});

export default rootReducer;
