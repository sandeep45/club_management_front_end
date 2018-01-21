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

const mapStateToProps = (state, ownProps) => {
  const clubId = ownProps.match.params.clubId;
  const todaysCheckins = reducers.getTodaysCheckinsArrayFromClubInUrl(state, ownProps);
  const membersHash = reducers.getMembersHash(state, ownProps);
  const checkinActivity = reducers.getCheckinActivity(state, ownProps);
  return {
    clubId,
    todaysCheckins,
    membersHash,
    checkinActivity,
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
    const {clubId, todaysCheckins, membersHash, getTodaysCheckins,
      removeCheckin, createCheckinFromQrCode, checkinActivity} = this.props;
    return (
      <div>
        <PageHeader>
          Checkins Dashboard
          <small> / of club - {clubId} </small>
          <Button bsStyle="primary" style={{float:'right'}}
                  onClick={getTodaysCheckins} >
            Reload Checkins
          </Button>
        </PageHeader>
        <Grid>
          <Row>
            <Col xs={12} md={10}>
              <CheckinTable checkins={todaysCheckins} membersHash={membersHash}
                            clubId={clubId}
                            removeCheckin={removeCheckin}/>
            </Col>
            <Col xs={12} md={2}>
              <CameraScanner
                updateQrCode={createCheckinFromQrCode} />

              <CheckinActivityTable checkinActivity={checkinActivity} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

CheckinsDashboard = connect(mapStateToProps, mapDispatchToProps)(CheckinsDashboard);

export default CheckinsDashboard