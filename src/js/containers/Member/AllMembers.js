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
import ConfirmationModal from '../../components/Generic/ConfirmationModal'

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
    updateSearchFields: actions.updateSearchFields,
    markAllPartTime: actions.markAllPartTime.bind(this, clubId),
  }, dispatch);
};

class AllMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
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
          <Button bsStyle="primary" onClick={goToNewMembersPage} style={{float:'right', marginLeft: 10}}>
            Create New Member
          </Button>
          <Button bsStyle="primary" onClick={() => this.setState({showModal: true})} style={{float:'right'}}>
            Reset All Members To Part-Time
          </Button>
          <ConfirmationModal visible={this.state.showModal}
                             closeModal={() => this.setState({showModal: false})}
                             actionButtonClicked={this._markAllPartTime}/>
        </PageHeader>

        <MemberLookup {...this.props}  />
        <MemberTable {...this.props} />

        <Button bsStyle="default" onClick={goToAllClubs}>
          Clubs
        </Button>
      </div>
    );
  };

  _markAllPartTime = () => {
    const {markAllPartTime, getMembers} = this.props;
    markAllPartTime().then(
      response => {
        console.log("all members have been marked as part time");
        return getMembers();
      }
    ).then(
      response => {
        console.log("all memebers have been fetched again");
        this.setState({ showModal: false });
      }
    )
  }

};

AllMembers = connect(mapStateToProps, mapDispatchToProps)(AllMembers);

export default AllMembers;