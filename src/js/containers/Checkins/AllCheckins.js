import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import * as actions from '../../action_creators';
import * as reducers from '../../reducers'

import CheckinTable from '../../components/Checkin/CheckinTable'
import {PageHeader, Button} from 'react-bootstrap'
import { push } from 'react-router-redux'
import { Calendar } from 'react-date-range';
import { OverlayTrigger, Popover, Tooltip } from "react-bootstrap"
import _ from "lodash";
import { getMembersHash, getTodaysCheckinsArrayFromClubInUrl } from "../../reducers/entities";

const mapStateToProps = (state, ownProps) => {
  const {match} = ownProps;
  const {clubId, memberId} = match.params;
  const club = reducers.getClubFromIdInUrl(state, ownProps);
  const checkinDate = reducers.getCheckinDate(state, ownProps);
  let checkinsArray = reducers.getCheckinsArray(state, ownProps);
  
  let checkinsArrayOfDate = checkinsArray.filter( checkin => {
    console.log("looking at ", checkin.id , " whose created at is ", checkin.created_at , " in moment is ", moment(checkin.created_at).format("MM-DD-YYYY"));
    console.log("comparing with ", checkinDate);
    console.log("coparison result ", moment(checkin.created_at).format("MM-DD-YYYY") == checkinDate);
    return moment(checkin.created_at).format("MM-DD-YYYY") == checkinDate;
  } );
  checkinsArray = checkinsArrayOfDate;
  const membersHash = reducers.getMembersHash(state, ownProps);
  const checkedInMembers = checkinsArray.map(checkin => membersHash[checkin.member_id]);
  const checkinsSorted = _.sortBy(checkinsArray, checkin => {
    if(membersHash[checkin.member_id].membership_kind == 'part_time'){
      return 0;
    }else if(membersHash[checkin.member_id].membership_kind == 'full_time'){
      return 1;
    }else if(membersHash[checkin.member_id].membership_kind == 'complimentary'){
      return 2;
    }else{
      return 1000;
    }
  });
  
  return {
    match,
    checkins: checkinsArray,
    checkinsSorted: checkinsSorted,
    clubId,
    club,
    memberId,
    membersHash,
    checkedInMembers,
    checkinDate
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {match} = ownProps;
  const {clubId, memberId} = match.params;
  return bindActionCreators({
    getMembersCheckedInOndate: actions.getMembersCheckedInOndate.bind(this, clubId),
    removeCheckin: actions.removeCheckin,
    goToAllClubs: () => push(`/clubs`),
    goToAllMembers: () => push(`/clubs/${clubId}/members`),
    setCheckingDate: actions.setCheckinDate,
    updateCheckin: actions.updateCheckin,
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
    this.props.getMembersCheckedInOndate();
    document.title = `Checkins`;
  };

  render() {
    const {clubId, memberId, goToNewCheckinsPage, goToAllClubs,
      checkinDate, goToAllMembers} = this.props;
    return (
      <div>
        <PageHeader>
          Checkins
          {memberId ? <small> / of member - {memberId} </small> : "" }
          {checkinDate ? <small> / of member - {checkinDate} </small> : "" }

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
    const {setCheckingDate, clubId, getMembersCheckedInOndate} = this.props;
    console.log(date);
    console.log(date.format("MM-DD-YYYY"));
    setCheckingDate(date.format("MM-DD-YYYY"));
    getMembersCheckedInOndate();
  }
};

AllCheckins = connect(mapStateToProps, mapDispatchToProps)(AllCheckins);

export default AllCheckins;