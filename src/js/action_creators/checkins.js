import * as WebUtil from '../web_util/'
import * as mySchema from '../config/mySchema'
import { normalize } from 'normalizr';
import K from '../constants/'
import {redirectOnUnAuthorized} from "./helper";
import {lookupMember} from './members';
import {addCheckinActivity} from './checkinActivity';
import * as reducers from '../reducers'
import {speak} from './helper'
import { toast } from 'react-toastify';

export const getCheckins = (clubId, memberId) => dispatch => {
  console.log("inside getCheckins");
  return WebUtil.getCheckins(clubId, memberId).then(
    response => {
      console.log("getCheckins response: ", response);
      const normalizedData = normalize(response.data, [mySchema.checkin]);
      console.log("getCheckins normalized data: ", normalizedData);
      dispatch({
        type: K.RECEIVE_ENTITY_ITEM,
        payload: normalizedData
      })
    }
  ).catch(redirectOnUnAuthorized.bind(this, dispatch))
};

export const createCheckinFromQrCode = (clubId, qrCodeNumber) => (dispatch, getState) => {
  console.log("in createCheckinFromQrCode with:", clubId, qrCodeNumber);
  console.log("Step 1. lets lookup the member");
  let memberId = null, txt;
  dispatch(
    lookupMember(clubId, {
      qr_code_number: qrCodeNumber
    })
  ).then(
    response => {
      memberId = response;
      console.log("member was looked up to be: ", memberId);
      console.log("Step 2. lets create a checking for this member");
      return dispatch(createCheckin(clubId, memberId))
    },
    error => {
      console.error("unable to find member with QR code: ", qrCodeNumber, clubId);
      speak("Member Not Found");
      toast.error(`Member Not Found by QR code: ${qrCodeNumber}`);
      // dispatch(addCheckinActivity(`Error. Unable to find Member by QR code: ${qrCodeNumber}`));
      throw error;
    }
  ).then(
    response => {
      console.log("creating checkin finished with response: ", response.status);
      const state = getState();
      const membersHash = reducers.getMembersHash(state);
      const member = membersHash[memberId];
      const txt = _checkinMessage(member);
      speak(txt);
      return response;
    }
  ).catch(
    error => {
      console.error("failed in createCheckinFromQrCode: ", error);
    }
  );
};


export const createCheckin = (clubId, memberId) => (dispatch , getState)=> {
  console.log("inside createCheckin: ", clubId, memberId);
  const state = getState();
  const membersHash = reducers.getMembersHash(state);
  const member = membersHash[memberId];
  return WebUtil.createCheckin(clubId, memberId).then(
    response => {
      console.log("getCheckin response: ", response);
      const normalizedData = normalize(response.data, mySchema.checkin);
      console.log("getCheckins normalized data: ", normalizedData);
      dispatch({
        type: K.RECEIVE_ENTITY_ITEM,
        payload: normalizedData
      });
      
      toast.success(_checkinMessage(member));
      return response;
    }
  ).catch(redirectOnUnAuthorized.bind(this, dispatch))
};

const _checkinMessage = (member) => {
  let txt = `Welcome ${member.name}, you have been checked in. `;
  if(member.membership_kind == 'full_time' || member.membership_kind == 'complimentary'){
    txt +=  'No Payment is due.'
  }else{
    txt +=  'Please make payment!'
  }
  return txt;
};

const _checkinUpdateMessage = (member, checkin) => {
  return `${member.name}'s check-in has been marked - ${checkin.paid == true ? 'PAID' : 'NOT-PAID'}`;
}



export const updateCheckin = (clubId, memberId, checkinId, params) => (dispatch, getState) => {
  console.log("inside updateCheckin: ", checkinId);
  return WebUtil.updateCheckin(clubId, memberId, checkinId, params).then(
    response => {
      console.log("updateCheckin response: ", response);
      const normalizedData = normalize(response.data, mySchema.checkin);
      console.log("updateCheckin normalized data: ", normalizedData);
      dispatch({
        type: K.RECEIVE_ENTITY_ITEM,
        payload: normalizedData
      });
      const state = getState();
      const membersHash = reducers.getMembersHash(state);
      const member = membersHash[memberId];
      const checkinsHash = reducers.getCheckinsHash(state);
      const checkin = checkinsHash[checkinId];
      const txt = _checkinUpdateMessage(member, checkin);
      toast.info(txt)
    }
  ).catch(redirectOnUnAuthorized.bind(this, dispatch))
}

export const removeCheckin = (clubId, memberId, checkinId) => dispatch => {
  console.log("inside deleteCheckin: ", checkinId);
  return WebUtil.removeCheckin(clubId, memberId, checkinId).then(
    response => {
      console.log("deleteCheckin response: ", response);
      dispatch({
        type: K.REMOVE_ENTITY_ITEM,
        payload: {
          name: "checkins",
          id: checkinId,
        }
      })
    }
  ).catch(redirectOnUnAuthorized.bind(this, dispatch))
};

