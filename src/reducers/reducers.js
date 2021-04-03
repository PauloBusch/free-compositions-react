import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import ContactReducer from '../site/reducers/contact/ContactReducer';
import MusicsReducer from '../site/reducers/musics/MusicsReducer';
import ArtistsReducer from '../site/reducers/artists/ArtistsReducer';
import RankingReducer from '../site/reducers/musics/RankingReducer';
import GenreReducer from '../site/reducers/genre/GenreReducer';
import PlaylistReducer from '../site/reducers/playlist/PlaylistReducer';

const rootReducer = combineReducers({
  toastr: toastrReducer,
  contact: ContactReducer,
  musics: MusicsReducer,
  artists: ArtistsReducer,
  ranking: RankingReducer,
  genres: GenreReducer,
  playlists: PlaylistReducer
});

export default rootReducer;
