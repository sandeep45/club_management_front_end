import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Route, Link, withRouter, Switch } from 'react-router-dom'

import * as actions from '../../action_creators';
import * as reducers from '../../reducers'
import Home from "../Home/HomeContainer";
import AllClubs from "../Club/AllClubs";
import NotFound from "../../components/Generic/NotFound";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import SignOut from "./SignOut";
import {PageHeader} from 'react-bootstrap'

const mapStateToProps = (state, ownProps) => {
  const {match} = ownProps;
  return {
    match
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

class Authentication extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {match} = this.props;
    return (
      <div className='container'>
        <PageHeader>Authentication</PageHeader>
        <Switch>
          <Route exact path={`${match.url}`} component={SignIn} />
          <Route path={`${match.url}/sign_in`} component={SignIn} />
          <Route path={`${match.url}/sign_up`} component={SignUp} />
          <Route path={`${match.url}/sign_out`} component={SignOut} />
          <Route path={`${match.url}/forgot_password`} component={ForgotPassword} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

Authentication = connect(mapStateToProps, mapDispatchToProps)(Authentication);

export default Authentication