import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../action_creators';
import * as reducers from '../../reducers'

import CheckinTable from '../../components/Checkin/CheckinTable'
import {PageHeader, Button} from 'react-bootstrap'
import { push } from 'react-router-redux'
import { Calendar } from 'react-date-range';
import { OverlayTrigger, Popover, Tooltip } from "react-bootstrap"

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
    document.title = `Checkins`;
  };

  render() {
    const {clubId, memberId, goToNewCheckinsPage, goToAllClubs, goToAllMembers} = this.props;
    return (
      <div>
        <PageHeader>
          Checkins
          <small> / of member - {memberId} </small>
          <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={
            <Popover id="popover-positioned-bottom"
              bsClass="popover"
              className="calendar">
                <Calendar
                  onInit={this._handleCalendar}
                  onChange={this._handleCalendar}
                />
              </Popover>}>
                <Button bsStyle="warning" style={{float: 'right'}}>
                  Calendar
                </Button>
          </OverlayTrigger>
        </PageHeader>
        <CheckinTable {...this.props} />
        <hr />
        <Button bsStyle="default" onClick={goToAllMembers}>
          Members
        </Button>{" "}
        <Button bsStyle="default" onClick={goToAllClubs}>
          Clubs
        </Button>{" "}
      </div>
    );
  };

  _handleCalendar = (date) => {
    console.log(date);
  }
};

AllCheckins = connect(mapStateToProps, mapDispatchToProps)(AllCheckins);

export default AllCheckins;