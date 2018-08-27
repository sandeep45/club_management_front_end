import K from '../constants'
import moment from 'moment'

const initalState = moment().format('MM-DD-YYYY');

const checkinDate = (state=initalState, action) => {
  if (!action.payload) {
    return state;
  }

  switch (action.type) {
    case K.SET_CHECKIN_DATE:
      const newState = moment(action.payload, 'MM-DD-YYYY').format('MM-DD-YYYY');
      return newState;
    default:
      return state;
  }
};

export default checkinDate;

export const getCheckinDate = (state) => state;
