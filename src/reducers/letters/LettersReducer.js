import { LETTER_FETCHED, LETTER_DELETED } from './LettersActionsTypes';

export default function LetterReducer(state = [], action) {
  switch(action.type) {
    case LETTER_FETCHED:
      return action.payload;
    case LETTER_DELETED:
      return state.filter(i => i.id !== action.payload);
    default: 
      return state;
  }
}
