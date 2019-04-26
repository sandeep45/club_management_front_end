import * as WebUtil from '../web_util/'
import * as mySchema from '../config/mySchema'
import { normalize } from 'normalizr';
import K from '../constants/'
import { push } from 'react-router-redux'
import {redirectOnUnAuthorized} from './helper'
import { toast } from 'react-toastify';

export const getClubs = () => dispatch => {
  console.log("inside getClubs");
  WebUtil.getClubs().then(
    response => {
      console.log("getClubs response: ", response);
      const normalizedData = normalize(response.data, [mySchema.club]);
      console.log("getClubs normalized data: ", normalizedData);
      dispatch({
        type: K.RECEIVE_ENTITY_ITEM,
        payload: normalizedData
      });
    }
  ).catch(redirectOnUnAuthorized.bind(this, dispatch))
};

export const getClub = (clubId) => dispatch => {
  console.log("inside getClub: ", clubId);
  WebUtil.getClub(clubId).then(
    response => {
      console.log("getClub response: ", response);
      const normalizedData = normalize(response.data, mySchema.club);
      console.log("getClubs normalized data: ", normalizedData);
      dispatch({
        type: K.RECEIVE_ENTITY_ITEM,
        payload: normalizedData
      })
    }
  ).catch(redirectOnUnAuthorized.bind(this, dispatch))
};

export const createClub = (params) => dispatch => {
  console.log("inside createClub: ", params);
  return WebUtil.createClub(params).then(
    response => {
      console.log("getClub response: ", response);
      const normalizedData = normalize(response.data, mySchema.club);
      console.log("getClubs normalized data: ", normalizedData);
      dispatch({
        type: K.RECEIVE_ENTITY_ITEM,
        payload: normalizedData
      })
    }
  ).catch(redirectOnUnAuthorized.bind(this, dispatch))
};

export const updateClub = (id, params) => dispatch => {
  console.log("inside updateClub: ", id, params);
  return WebUtil.updateClub(id, params).then(
    response => {
      console.log("getClub response: ", response);
      const normalizedData = normalize(response.data, mySchema.club);
      console.log("getClubs normalized data: ", normalizedData);
      dispatch({
        type: K.RECEIVE_ENTITY_ITEM,
        payload: normalizedData
      })
    }
  ).catch(redirectOnUnAuthorized.bind(this, dispatch))
};

export const removeClub = (id) => dispatch => {
  console.log("inside deleteClub: ", id);
  return WebUtil.removeClub(id).then(
    response => {
      console.log("deleteClub response: ", response);
      dispatch({
        type: K.REMOVE_ENTITY_ITEM,
        payload: {
          name: "clubs",
          id: id,
        }
      })
    }
  ).catch(redirectOnUnAuthorized.bind(this, dispatch))
};

export const assignTablesStraightForClub = (clubId, numberOfTables, peoplePerTable) => dispatch => {
  console.log("inside assignTablesStraightForClub: ", clubId);
  WebUtil.assignTablesStraightForClub(clubId, numberOfTables, peoplePerTable).then(
    response => {
      console.log("getClub response: ", response);
      const normalizedData = normalize(response.data, [mySchema.member]);
      console.log("getClubs normalized data: ", normalizedData);
      dispatch({
        type: K.RECEIVE_ENTITY_ITEM,
        payload: normalizedData
      });
      toast.info(`Tables have been assigned Straight based on player ranking.`, { autoClose: 5000 });
    }
  ).catch(redirectOnUnAuthorized.bind(this, dispatch))
};

export const assignTablesEveryOtherForClub = (clubId, numberOfTables, peoplePerTable) => dispatch => {
  console.log("inside assignTablesEveryOtherForClub: ", clubId);
  WebUtil.assignTablesEveryOtherForClub(clubId, numberOfTables, peoplePerTable).then(
    response => {
      console.log("getClub response: ", response);
      const normalizedData = normalize(response.data, [mySchema.member]);
      console.log("getClubs normalized data: ", normalizedData);
      dispatch({
        type: K.RECEIVE_ENTITY_ITEM,
        payload: normalizedData
      });
      toast.info(`Tables have been assigned based on Every Other Formulae.`, { autoClose: 5000 });
    }
  ).catch(redirectOnUnAuthorized.bind(this, dispatch))
};

export const assignTablesRandomForClub = (clubId, numberOfTables, peoplePerTable) => dispatch => {
  console.log("inside assignTablesEveryOtherForClub: ", clubId);
  WebUtil.assignTablesRandomForClub(clubId, numberOfTables, peoplePerTable).then(
    response => {
      console.log("getClub response: ", response);
      const normalizedData = normalize(response.data, [mySchema.member]);
      console.log("getClubs normalized data: ", normalizedData);
      dispatch({
        type: K.RECEIVE_ENTITY_ITEM,
        payload: normalizedData
      });
      toast.info(`Tables have been assigned randomly.`, { autoClose: 5000 });
    }
  ).catch(redirectOnUnAuthorized.bind(this, dispatch))
};

