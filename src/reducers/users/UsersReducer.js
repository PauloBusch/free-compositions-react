import { USER_FETCHED, USER_DELETED } from './UsersActionsTypes';

export default function UserReducer(state = [], action) {
  switch(action.type) {
    case USER_FETCHED: 
      return action.payload;
    case USER_DELETED:
      return state.filter(i => i.id !== action.payload);
    default: 
      return state;
  }
}
