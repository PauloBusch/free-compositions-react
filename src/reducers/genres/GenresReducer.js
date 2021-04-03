import { GENRE_FETCHED, GENRE_DELETED } from './GenresActionsTypes';

export default function GenreReducer(state = [], action) {
  switch(action.type) {
    case GENRE_FETCHED: 
      return action.payload;
    case GENRE_DELETED:
      return state.filter(i => i.id !== action.payload);
    default: 
      return state;
  }
}
