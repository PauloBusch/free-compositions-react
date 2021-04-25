import { ARTIST_FETCHED } from './ArtistsActionsTypes';

export default function ArtistsReducer(state = [], action) {
  switch(action.type) {
    case ARTIST_FETCHED: 
      return action.payload;
    default: 
      return state;
  }
}
