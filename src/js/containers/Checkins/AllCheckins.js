import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../action_creators';
import * as reducers from '../../reducers'

import CheckinTable from '../../components/Checkin/CheckinTable'
import {PageHeader, Button} from 'react-bootstrap'
import { push } from 'react-router-redux'

const mapStateToProps = (state, ownProps) => {
  const {match} = ownProps;
  const {clubId, memberId} = match.params;
  const checkinsArray = reducers.getCheckinsArrayFromMemberInUrl(state, ownProps);
  const membersHash = reducers.getMembersHash(state, ownProps);
  return {
    match,
    checkins: checkinsArray,
    clubId,
    memberId,
    membersHash
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {match} = ownProps;
  const {clubId, memberId} = match.params;
  return bindActionCreators({
    getCheckins: actions.getCheckins.bind(this, clubId, memberId),
    removeCheckin: actions.removeCheckin,
    goToAllClubs: () => push(`/clubs`),
    goToAllMembers: () => push(`/clubs/${clubId}/members`),
  }, dispatch);
};

class AllCheckins extends Component {
  constructor(props) {
    super(props)
  };

  componentWillMount(){
    console.log("AllCheckins Container has mounted");
    this._init();
  };

  _init = () => {
    this.props.getCheckins();
    document.title = `All Checkins`;
  };

  render() {
    const {clubId, memberId, goToNewCheckinsPage, goToAllClubs, goToAllMembers} = this.props;
    return (
      <div>
        <PageHeader>All Checkins <small> / of member - {memberId} </small></PageHeader>
        <CheckinTable {...this.props} />
        <hr />
        <Button bsStyle="default" onClick={goToAllMembers}>
          View All Members
        </Button>{" "}
        <Button bsStyle="default" onClick={goToAllClubs}>
          View All Clubs
        </Button>{" "}
      </div>
    );
  };
};

AllCheckins = connect(mapStateToProps, mapDispatchToProps)(AllCheckins);

export default AllCheckins;