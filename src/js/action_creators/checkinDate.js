import * as WebUtil from '../web_util'
import * as mySchema from '../config/mySchema'
import { normalize } from 'normalizr';
import K from '../constants'
import {redirectOnUnAuthorized} from "./helper";
import {lookupMember} from './members';
import * as reducers from '../reducers'
import uuid from 'uuid'

export const setCheckinDate = (date) => {
  return {
    type: K.SET_CHECKIN_DATE,
    payload: date
  }
};
