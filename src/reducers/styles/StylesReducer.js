import { STYLE_FETCHED, STYLE_DELETED } from './StylesActionsTypes';

export default function StyleReducer(state = [], action) {
  switch(action.type) {
    case STYLE_FETCHED: 
      return action.payload;
    case STYLE_DELETED:
      return state.filter(i => i.id !== action.payload);
    default: 
      return state;
  }
}
