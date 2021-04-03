import { MUSIC_FETCHED, MUSIC_DELETED } from './MusicsActionsTypes';

const INITIAL_STATE = [];

export default function SliderReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case MUSIC_FETCHED: 
      return action.payload;
    case MUSIC_DELETED:
      return state.filter(i => i.id !== action.payload);
    default: 
      return state;
  }
}
