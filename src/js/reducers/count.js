import merge from 'lodash/merge'
import K from '../constants/'

const initialState = 0;

const count = (state=initialState, action) => {
  switch(action.type){
    case K.INCREMENT_COUNT:
      return state + 1;
    case K.DECREMENT_COUNT:
      return state - 1;
    default:
      return state;
  }
};

// selectors
export const getCount = (state) => state || initialState;

export default count;