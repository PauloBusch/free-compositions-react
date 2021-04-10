import { SLIDE_FETCHED, SLIDE_DELETED } from './SlidesActionsTypes'; 

export default function SlidesReducer(state = [], action) {
  switch(action.type) {
    case SLIDE_FETCHED: 
      return action.payload;
    case SLIDE_DELETED:
      return state.filter(i => i.id !== action.payload);
    default: 
      return state;
  }
}
