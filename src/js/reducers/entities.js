import merge from 'lodash/merge'
import K from '../constants/'
import { createSelector } from 'reselect'
import moment from 'moment'
import {getSearchFields} from './searchFields'

const initialState = {
  owners: { },
  clubs: { },
  members: { },
  checkins: { },
};

const entities = (state=initialState, action) => {
  if(!action.payload || !action.type){
    return state;
  }

  switch(action.type){
    case K.RECEIVE_ENTITY_ITEM:
      return mergeInTheEntity(state, action);
    case K.REMOVE_ENTITY_ITEM:
      return deleteTheEntity(state, action);
    default:
      return state;
  }
};

// case reducers
const mergeInTheEntity = (state, action) => {
  if(action.payload.entities){
    return merge( {} , state, action.payload.entities);
  }else{
    return state;
  }
};

// case reducers
const deleteTheEntity = (state, action) => {
  if(action.payload.name && action.payload.id) {
    // name is 'checkins', id is '24'
    const {name, id} = action.payload;
    let newState = merge({}, state);
    if(newState[name]){
      // removes the item from the hash
      delete newState[name][id];

      // removes the item from the array held by other entity hashes
      Object.keys(newState).map(key => {
        // eventually key is "members"
        let entityHash = newState[key];
        Object.keys(entityHash).map(entityId => {
          let entity = entityHash[entityId];
          if(entity[name] && Array.isArray(entity[name])){
            entity[name] = entity[name].filter(item => item != id);
          }
        });
      })
    }
    return newState;
  }else{
    return state;
  }
}

// regular selectors
export const getEntireEntityHash = state => state || {};
export const getOwnersHash = state => state["owners"];
export const getClubsHash = state => state["clubs"];
export const getMembersHash = state => state["members"];
export const getCheckinsHash = state => state["checkins"];

export const getClubsArray = createSelector(
  getClubsHash , clubsHash => Object.keys(clubsHash).map(k => clubsHash[k])
);
export const getMembersArray = createSelector(
  getMembersHash , membersHash => Object.keys(membersHash).map(k => membersHash[k])
);
export const getCheckinsArray = createSelector(
  getCheckinsHash , checkinsHash => Object.keys(checkinsHash).map(k => checkinsHash[k])
);

export const getClubFromIdInUrl = (state, ownProps) => {
  const clubsHash = getClubsHash(state);
  const clubId = ownProps.match.params.clubId;
  return clubsHash[clubId] || {};
};
export const getMemberFromIdInUrl = (state, ownProps) => {
  const membersHash = getMembersHash(state);
  const memberId = ownProps.match.params.memberId;
  return membersHash[memberId] || {};
};
export const getCheckinFromIdInUrl = (state, ownProps) => {
  const checkinsHash = getCheckinsHash(state);
  const checkinId = ownProps.match.params.checkinId;
  return checkinsHash[checkinId] || {};
};

export const getFilteredMembersArray = createSelector(
  getMembersArray, getSearchFields,
  (membersArray, searchFields) => {
    if(searchFields && searchFields.memberLookup){
      membersArray = membersArray.filter(member => {
        return member.name.includes(searchFields.memberLookup) ||
          member.email.includes(searchFields.memberLookup)
      })
    }
    return membersArray;
  }
);

export const getMembersArrayFromClubInUrl = createSelector(
  getClubFromIdInUrl, getMembersHash,
  (club, membersHash) => {
    const memberIds = club.members || [];
    return memberIds.map( memberId => membersHash[memberId]);
  }
);
export const getCheckinsArrayFromMemberInUrl = createSelector(
  getMemberFromIdInUrl, getCheckinsHash,
  (member, checkinsHash)=> {
    const checkinIds = member.checkins || [];
    return checkinIds.map( checkinId => checkinsHash[checkinId]);
  }
);
const getCheckinsArrayFromClubInUrl = createSelector(
  getMembersArrayFromClubInUrl, getCheckinsHash,
  (members, checkinsHash)=> {
    return members.reduce(
      (accumulator, member) => {
        let memberCheckins = member.checkins || [];
        memberCheckins.map(checkinId => accumulator.push(checkinsHash[checkinId]));
        return accumulator;
      },
      []
    );
  }
);
export const getTodaysCheckinsArrayFromClubInUrl = (state, ownProps) => {
  const allCheckinsOfClub = getCheckinsArrayFromClubInUrl(state, ownProps);
  const todayCheckins = allCheckinsOfClub.filter(
    checkin => moment(checkin.created_at || null).isSame(moment(), 'day')
  );
  return todayCheckins;
};

export const getAuthEmail = (state) => {
  const ownersHash = getOwnersHash(state);
  const ownerId = Object.keys(ownersHash)[0];
  if(ownerId){
    return ownersHash[ownerId].email;
  }else {
    return "";
  }
};

export default entities;