import { combineReducers } from 'redux';

import ContactReducer from './contact/ContactReducer';
import MusicsReducer from './musics/MusicsReducer';
import ArtistsReducer from './artists/ArtistsReducer';
import RankingReducer from './musics/RankingReducer';
import GenreReducer from './genre/GenreReducer';
import PlaylistReducer from './playlist/PlaylistReducer';

export default combineReducers({
  contact: ContactReducer,
  musics: MusicsReducer,
  artists: ArtistsReducer,
  ranking: RankingReducer,
  genres: GenreReducer,
  playlists: PlaylistReducer
});
