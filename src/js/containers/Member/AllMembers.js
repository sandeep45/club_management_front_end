import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Capitalize from 'capitalize'

import * as actions from '../../action_creators';
import * as reducers from '../../reducers'

import MemberTable from '../../components/Member/MemberTable'
import {PageHeader} from 'react-bootstrap'
import { push } from 'react-router-redux'
import {Button} from 'react-bootstrap'
import MemberLookup from "../../components/Member/MemberLookup";

const mapStateToProps = (state, ownProps) => {
  const match = ownProps.match;
  const clubId = ownProps.match.params.clubId;
  const club = reducers.getClubFromIdInUrl(state, ownProps);
  let membersArray = reducers.getFilteredMembersArray(state, ownProps);
  const searchFields = reducers.getSearchFields(state, ownProps);

  return {
    match,
    members:
    membersArray,
    club,
    clubId,
    searchFields,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const clubId = ownProps.match.params.clubId;
  const {match} = ownProps;
  return bindActionCreators({
    getMembers: actions.getMembers.bind(this, clubId),
    goToNewMembersPage: () => push(`${match.url}/new`),
    goToAllClubs: () => push(`/clubs`),
    createCheckin: (memberId) => actions.createCheckin(clubId, memberId),
    updateSearchFields: actions.updateSearchFields
  }, dispatch);
};

class AllMembers extends Component {
  constructor(props) {
    super(props)
  };

  componentWillMount(){
    console.log("AllMembers Container has mounted");
    this._init();
  };

  _init = () => {
    this.props.getMembers();
    document.title = `Members`;
  };

  render() {
    const {club, clubId, goToNewMembersPage, goToAllClubs} = this.props;
    return (
      <div>
        <PageHeader>
          Members
          <small> / of club - {club.name ? Capitalize(club.name) : ''} </small>
          <Button bsStyle="primary" onClick={goToNewMembersPage} style={{float:'right'}}>
            Create New Member
          </Button>
        </PageHeader>

        <MemberLookup {...this.props}  />
        <MemberTable {...this.props} />

        <Button bsStyle="default" onClick={goToAllClubs}>
          Clubs
        </Button>
      </div>
    );
  };
};

AllMembers = connect(mapStateToProps, mapDispatchToProps)(AllMembers);

export default AllMembers;