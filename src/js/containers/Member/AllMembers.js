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
    downloadRatings: actions.downloadRatings.bind(this, clubId),
  }, dispatch);
};

class AllMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRatingsModal: false,
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
          <small> / {club.name ? Capitalize(club.name) : ''} </small>
          <Button bsStyle="primary" onClick={goToNewMembersPage} style={{float:'right', marginLeft: 10}}>
            New Member
          </Button>
          <Button bsStyle="primary" onClick={() => this.setState({showRatingsModal: true})} style={{float:'right', marginLeft: 10}}>
            Download Ratings
          </Button>
          <Button bsStyle="primary" onClick={() => this.setState({showModal: true})} style={{float:'right'}}>
            Reset to Part-Time
          </Button>
          <ConfirmationModal visible={this.state.showModal}
                             closeModal={() => this.setState({showModal: false})}
                             actionButtonClicked={this._markAllPartTime}/>
          <ConfirmationModal visible={this.state.showRatingsModal}
                             closeModal={() => this.setState({showRatingsModal: false})}
                             actionButtonClicked={this._downloadRatings}/>
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
  };

  _downloadRatings = () => {
    const {downloadRatings} = this.props;
    downloadRatings().then(
      response => {
        this.setState({ showRatingsModal: false });
      }
    )
  };

};

AllMembers = connect(mapStateToProps, mapDispatchToProps)(AllMembers);

export default AllMembers;