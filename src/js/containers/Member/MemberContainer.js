import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Route, Link, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import * as actions from '../../action_creators';
import * as reducers from '../../reducers';

import NotFound from "../../components/Generic/NotFound";
import AllMembers from "./AllMembers";
import ShowMember from "./ShowMember";
import NewMember from "../Member/NewMember";
import EditMember from "../Member/EditMember";
import CheckinsContainer from '../Checkins/CheckinsContainer'

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

class MemberContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {match} = this.props;
    return (
      <div className="container">
        <Switch>

          <Route exact path={match.path} component={AllMembers}/>
          <Route exact path={`${match.path}/new`} component={NewMember}/>
          <Route exact path={`${match.path}/:memberId/edit`} component={EditMember}/>
          <Route path={`${match.path}/:memberId/checkins`} component={CheckinsContainer}/>
          <Route exact path={`${match.path}/:memberId`} component={ShowMember}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

MemberContainer = connect(mapStateToProps, mapDispatchToProps)(MemberContainer);

export default MemberContainer