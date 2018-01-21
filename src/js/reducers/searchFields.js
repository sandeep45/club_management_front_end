import K from '../constants'

const initalState = {
  memberLookup: null,
};

const search = (state=initalState, action) => {
  if (!action.payload) {
    return state;
  }

  switch (action.type) {
    case K.UPDATE_SEARCH_FIELDS:
      const newState = {
        ...state,
        ...action.payload
      };
      return newState;
    default:
      return state;
  }
};

export default search;

export const getSearchFields = (state) => state;
