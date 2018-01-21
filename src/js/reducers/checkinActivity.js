import K from '../constants'

const initalState = [];

const checkinActivity = (state=initalState, action) => {
  if (!action.payload) {
    return state;
  }

  switch (action.type) {
    case K.ADD_CHECKIN_ACTIVITY:
      const newState = [action.payload, ...state];
      return newState;
    default:
      return state;
  }
};

export default checkinActivity;

export const getCheckinActivity = (state) => state;
