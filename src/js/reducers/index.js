import { combineReducers } from 'redux'
import entities, * as fromEntities from './entities'
// import club, * as fromClub from './club'
import count, * as fromCount from './count'
import checkinActivity, * as fromCheckinActivity from './checkinActivity'
import search, * as fromSearch from './searchFields'
import { routerReducer } from 'react-router-redux'
import { createSelector } from 'reselect'


const myRootReducer = combineReducers({
  routing: routerReducer,
  entities,
  count,
  // club,
  checkinActivity,
  search
});

// selectors

export const getEntireEntityHash = (state, ownProps) => fromEntities.getEntireEntityHash(state.entities, ownProps);

export const getOwnersHash = (state, ownProps) => fromEntities.getOwnersHash(state.entities, ownProps);
export const getClubsHash = (state, ownProps) => fromEntities.getClubsHash(state.entities, ownProps);
export const getMembersHash = (state, ownProps) => fromEntities.getMembersHash(state.entities, ownProps);
export const getCheckinsHash = (state, ownProps) => fromEntities.getCheckinsHash(state.entities, ownProps);

export const getClubsArray = (state, ownProps) => fromEntities.getClubsArray(state.entities, ownProps);
export const getMembersArray = (state, ownProps) => fromEntities.getMembersArray(state.entities, ownProps);
export const getCheckinsArray = (state, ownProps) => fromEntities.getCheckinsArray(state.entities, ownProps);

export const getClubFromIdInUrl = (state, ownProps) => fromEntities.getClubFromIdInUrl(state.entities, ownProps);
export const getMemberFromIdInUrl = (state, ownProps) => fromEntities.getMemberFromIdInUrl(state.entities, ownProps);
export const getCheckinFromIdInUrl = (state, ownProps) => fromEntities.getCheckinFromIdInUrl(state.entities, ownProps);

export const getMembersArrayFromClubInUrl = (state, ownProps) => fromEntities.getMembersArrayFromClubInUrl(state.entities, ownProps);
export const getCheckinsArrayFromMemberInUrl = (state, ownProps) => fromEntities.getCheckinsArrayFromMemberInUrl(state.entities, ownProps);

export const getTodaysCheckinsArrayFromClubInUrl = (state, ownProps) => fromEntities.getTodaysCheckinsArrayFromClubInUrl(state.entities, ownProps);

export const getAuthEmail = (state, ownProps) => fromEntities.getAuthEmail(state.entities, ownProps);

export const getCheckinActivity = (state, ownProps) => fromCheckinActivity.getCheckinActivity(state.checkinActivity, ownProps);

export const getSearchFields = (state, ownProps) => fromSearch.getSearchFields(state.search, ownProps);

export const getFilteredMembersArray = createSelector(
  getMembersArrayFromClubInUrl, getSearchFields,
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

export default myRootReducer