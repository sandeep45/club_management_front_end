import React, {Component} from 'react'
import {connect} from 'react-redux'
import {PageHeader, Button, Grid, Row, Col} from 'react-bootstrap'
import * as actions from '../../action_creators';
import * as reducers from '../../reducers';

import CameraScanner from "../../components/Generic/CameraScanner";
import CheckinTable from '../../components/Checkin/CheckinTable'
import { bindActionCreators } from 'redux'
import {push} from "react-router-redux";
import CheckinActivityTable from "../../components/CheckinActivity/CheckinActivityTable";
import ManualCheckinBox from "../../components/Checkin/ManualCheckinBox";
import Capitalize from "capitalize";

const mapStateToProps = (state, ownProps) => {
  const clubId = ownProps.match.params.clubId;
  const club = reducers.getClubFromIdInUrl(state, ownProps);
  const todaysCheckins = reducers.getTodaysCheckinsArrayFromClubInUrl(state, ownProps);
  const membersHash = reducers.getMembersHash(state, ownProps);
  const checkinActivity = reducers.getCheckinActivity(state, ownProps);
  const checkedInMembers = reducers.getCheckedInMembersFromClubInUrl(state, ownProps);
  return {
    club,
    clubId,
    todaysCheckins,
    membersHash,
    checkinActivity,
    checkedInMembers
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const clubId = ownProps.match.params.clubId;
  return bindActionCreators({
    getTodaysCheckins: actions.getMembersCheckedInToday.bind(this, clubId),
    removeCheckin: actions.removeCheckin,
    createCheckinFromQrCode: actions.createCheckinFromQrCode.bind(this, clubId),
    addCheckinActivity: actions.addCheckinActivity
  }, dispatch);
};

class CheckinsDashboard extends Component {
  constructor(props) {
    super(props)
  };

  componentWillMount(){
    console.log("AllCheckins Container has mounted");
    this._init();
  };

  _init = () => {
    const {clubId, getTodaysCheckins} = this.props;
    getTodaysCheckins();
    document.title = `Checkins Dashboard for Club ${clubId}`;
  };


  render() {
    const {club, clubId, todaysCheckins, membersHash, getTodaysCheckins,
      removeCheckin, createCheckinFromQrCode, checkinActivity, checkedInMembers} = this.props;
    return (
      <div>
        <PageHeader>
          Checkin's
          <small> / of club - {club.name ? Capitalize(club.name) : ''} </small>
          <Button bsStyle="primary" style={{float:'right'}}
                  onClick={getTodaysCheckins} >
            Reload Checkin's
          </Button>
        </PageHeader>
        <ManualCheckinBox updateQrCode={createCheckinFromQrCode} />
        <CheckinTable checkins={todaysCheckins} membersHash={membersHash}
                      clubId={clubId} checkedInMembers={checkedInMembers}
                      removeCheckin={removeCheckin}/>
      </div>
    );
  }
}

CheckinsDashboard = connect(mapStateToProps, mapDispatchToProps)(CheckinsDashboard);

export default CheckinsDashboard