import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from "react-router-redux";
import {bindActionCreators} from "redux";

import * as actions from '../../action_creators';
import * as reducers from '../../reducers'

import WelcomeMessage from '../../components/Home/WelcomeMessage'

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    goToPage: (url) => push(url),
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeMessage);