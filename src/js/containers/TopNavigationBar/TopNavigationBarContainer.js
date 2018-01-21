import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import {push} from "react-router-redux";

import * as actions from '../../action_creators';
import * as reducers from '../../reducers';

import SignedInBar from '../../components/NavigationBars/SignedInBar'

const mapStateToProps = (state, ownProps) => {
  const email = reducers.getAuthEmail(state);
  let clubId = 0;
  if(ownProps.match && ownProps.match.params && ownProps.match.params.clubId){
    clubId = ownProps.match.params.clubId;
  }
  console.log(ownProps);
  return {
    email,
    clubId
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    signOut: actions.signOut,
    goToPage: (url) => push(url),
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SignedInBar);