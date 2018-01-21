import merge from 'lodash/merge'
import K from '../constants/'

const initialState = {
  allIds: [],
  deletedIds: [],
  byId: {}
};

const club = (state=initialState, action) => {
  if(!action.payload || !action.type){
    return state;
  }

  switch(action.type){
    case K.RECEIVE_CLUB_ENTITY:
      return {
        ...state,
        byId: merge( {} , state.byId, action.payload.entities),
        allIds: state.allIds.concat(Object.keys(action.payload.entities))
      };
    case K.DELETE_CLUB_ENTITY:
      return {
        ...state,
        deletedIds: state.deletedIds.concat(action.payload)
      };
    default:
      return state;
  }

};

export default club;