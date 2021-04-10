import { SLIDE_FETCHED, SLIDE_DELETED } from './SlidesActionsTypes'; 

const INITIAL_STATE = [
  { image: 'images/slides/slide-1.jpeg', positionX: 'right', positionY: 'center' },
  { image: 'images/slides/slide-2.jpeg', positionX: 'right', positionY: 'center' },
  { image: 'images/slides/slide-3.jpeg', positionX: 'right', positionY: 'center' }
];

export default function SlidesReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SLIDE_FETCHED: 
      return action.payload.data;
    case SLIDE_DELETED:
      return state.slides.filter(i => i._id !== action.payload);
    default: 
      return state;
  }
}
