import * as WebUtil from '../web_util'
import * as mySchema from '../config/mySchema'
import { normalize } from 'normalizr';
import K from '../constants'
import {redirectOnUnAuthorized} from "./helper";
import {lookupMember} from './members';
import * as reducers from '../reducers'
import uuid from 'uuid'

export const addCheckinActivity = (message) => {
  return {
    type: K.ADD_CHECKIN_ACTIVITY,
    payload: {
      message,
      uuid: uuid.v4()
    },
  }
};
