import { HISTORY_FETCHED } from './HistoryActionsTypes';

export default function HistoryReducer(state = [], action) {
  switch(action.type) {
    case HISTORY_FETCHED:
      return action.payload;
    default: 
      return state;
  }
}
