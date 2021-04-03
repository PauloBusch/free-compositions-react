import { MUSIC_FETCHED, MUSIC_DELETED } from './MusicsActionsTypes';

export default function SliderReducer(state = [], action) {
  switch(action.type) {
    case MUSIC_FETCHED: 
      return action.payload;
    case MUSIC_DELETED:
      return state.filter(i => i.id !== action.payload);
    default: 
      return state;
  }
}
