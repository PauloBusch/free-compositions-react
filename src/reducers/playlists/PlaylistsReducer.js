import { PLAYLIST_FETCHED, PLAYLIST_DELETED } from './PlaylistsActionsTypes';

export default function PlaylistReducer(state = [], action) {
  switch(action.type) {
    case PLAYLIST_FETCHED: 
      return action.payload;
    case PLAYLIST_DELETED:
      return state.filter(i => i.id !== action.payload);
    default: 
      return state;
  }
}
