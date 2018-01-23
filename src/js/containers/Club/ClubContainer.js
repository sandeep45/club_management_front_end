import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { Route, Link, Switch } from 'react-router-dom'

import * as actions from '../../action_creators';
import * as reducers from '../../reducers';

import NotFound from "../../components/Generic/NotFound";
import AllClubs from '../Club/AllClubs.js'
import ShowClub from '../Club/ShowClub.js'
import NewClub from '../Club/NewClub.js'
import EditClub from '../Club/EditClub.js'
import SignedInBar from "../TopNavigationBar/TopNavigationBarContainer";
import MemberContainer from "../Member/MemberContainer";
import CheckinsDashboard from "../Checkins/CheckinsDashboard";
import SecondaryPills from "../TopNavigationBar/SecondaryPills";


const mapStateToProps = (state, ownProps) => {
  const {match} = ownProps;
  return {
    match
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    goToPage: url => push(url)
  }, dispatch);
};

class ClubContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {match} = this.props;
    return <div>
      <Route path={`${match.url}`} component={SignedInBar}/>

      <div className="container">

        <Route path={`${match.url}/:clubId`} component={SecondaryPills}/>

        <Switch>
          <Route exact path={match.url} component={AllClubs}/>
          <Route exact path={`${match.url}/new`} component={NewClub}/>
          <Route exact path={`${match.url}/:clubId/edit`} component={EditClub}/>
          <Route path={`${match.url}/:clubId/members`} component={MemberContainer}/>
          <Route exact path={`${match.url}/:clubId/checkins/dashboard`} component={CheckinsDashboard}/>
          <Route exact path={`${match.url}/:clubId`} component={ShowClub}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    </div>;
  }
}

ClubContainer = connect(mapStateToProps, mapDispatchToProps)(ClubContainer);

export default ClubContainer