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
import CheckinsContainer from "../Checkins/CheckinsContainer";
import PlayDateContainer from "../PlayDate/PlayDateContainer";
import TablesBreakOut from "./TablesBreakOut";
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
          <Route path={`${match.url}/:clubId/tables_break_out`} component={TablesBreakOut}/>
          <Route path={`${match.url}/:clubId/members`} component={MemberContainer}/>
          <Route path={`${match.url}/:clubId/checkins`} component={CheckinsContainer}/>
          <Route path={`${match.url}/:clubId/play_dates`} component={PlayDateContainer}/>
          <Route exact path={`${match.url}/:clubId`} component={ShowClub}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    </div>;
  }
}

ClubContainer = connect(mapStateToProps, mapDispatchToProps)(ClubContainer);

export default ClubContainer