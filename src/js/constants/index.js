import keyMirror from "keymirror"
export * from './sounds'

const appConstants = keyMirror({
  RECEIVE_ENTITY_ITEM: null,
  REMOVE_ENTITY_ITEM: null,
  INCREMENT_COUNT: null,
  DECREMENT_COUNT: null,
  RECEIVE_CLUB_ENTITY: null,
  DELETE_CLUB_ENTITY: null,
  ADD_CHECKIN_ACTIVITY: null,
  UPDATE_SEARCH_FIELDS: null,
});

export default appConstants;