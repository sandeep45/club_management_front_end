import * as WebUtil from '../web_util/'
import * as mySchema from '../config/mySchema'
import { normalize } from 'normalizr';
import K from '../constants/'
import { push } from 'react-router-redux'
import axios from 'axios'

export const signIn = params => dispatch => {
  console.log("inside signIn: ", params);
  return WebUtil.signIn(params).then(
    response => {
      const {headers} = response;

      axios.defaults.headers.common['access-token'] = headers['access-token'];
      axios.defaults.headers.common['client'] = headers['client'];
      axios.defaults.headers.common['token-type'] = 'Bearer';
      axios.defaults.headers.common['uid'] = response.data.data.uid;

      const normalizedData = normalize(response.data.data, mySchema.owner);
      dispatch({
        type: K.RECEIVE_ENTITY_ITEM,
        payload: normalizedData
      });

      dispatch(push("/clubs"));
    },
    error => {
      console.log(error);
    }
  )
};

export const signUp = params => dispatch => {
  console.log("inside signUp: ", params);
  return WebUtil.signUp(params).then(
    response => {
      const {headers} = response;
      
      axios.defaults.headers.common['access-token'] = headers['access-token'];
      axios.defaults.headers.common['client'] = headers['client'];
      axios.defaults.headers.common['token-type'] = 'Bearer';
      axios.defaults.headers.common['uid'] = response.data.data.uid;
      
      const normalizedData = normalize(response.data.data, mySchema.owner);
      dispatch({
        type: K.RECEIVE_ENTITY_ITEM,
        payload: normalizedData
      });
      
      dispatch(push("/clubs"));
    },
    error => {
      console.log(error);
    }
  )
};

export const signOut = ()=> dispatch => {
  console.log("inside signOut: ");
  return WebUtil.signOut().then(
    response => {
      const {headers} = response;

      axios.defaults.headers.common['access-token'] = "";
      axios.defaults.headers.common['client'] = "";
      axios.defaults.headers.common['token-type'] = "";
      axios.defaults.headers.common['uid'] = "";

      // Todo - empty state

      dispatch(push("/authentication/sign_in"));
    },
    error => {
      console.log(error);
      dispatch(push("/authentication/sign_in"));
    }
  )
};
