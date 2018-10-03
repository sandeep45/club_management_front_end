import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../action_creators';
import * as reducers from '../../reducers'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { push } from 'react-router-redux'
import {Button, PageHeader, Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
import ConfirmationModal from '../../components/Generic/ConfirmationModal'
import Capitalize from "capitalize";
import AllPlayTables from '../../components/Club/AllPlayTables';

const mapStateToProps = (state, ownProps) => {
  const clubId = ownProps.match.params.clubId;
  const club = reducers.getClubFromIdInUrl(state, ownProps);
  const members = reducers.getMembersArrayFromClubInUrl(state, ownProps);
  return {
    club,
    clubId,
    members
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const clubId = ownProps.match.params.clubId;
  return bindActionCreators({
    getClub: actions.getClub.bind(this, clubId),
    getMembersCheckedInToday: actions.getMembersCheckedInToday.bind(this, clubId),
    assignTablesStraightForClub: (numberOfTables, peoplePerTable) => actions.assignTablesStraightForClub(clubId, numberOfTables, peoplePerTable),
    assignTablesEveryOtherForClub: (numberOfTables, peoplePerTable) => actions.assignTablesEveryOtherForClub(clubId, numberOfTables, peoplePerTable),
    assignTablesRandomForClub: (numberOfTables, peoplePerTable) => actions.assignTablesRandomForClub(clubId, numberOfTables, peoplePerTable),
    goToClubsIndexPage: () => push("/clubs"),
    updateMember: (memberId, obj) => actions.updateMember(clubId, memberId, obj)
  }, dispatch);
};

class TablesBreakOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  };

  componentWillMount(){
    console.log("TablesBreakOut Container has mounted");
    const clubId = this.props.match.params.clubId;
    this._init(clubId);
  };

  componentWillReceiveProps(nextProps){
    const oldClubId = this.props.match.params.clubId;
    const newClubId = nextProps.match.params.clubId;
    console.log("Club has been updated. Old Id: ", oldClubId, " and New Id: ", newClubId);
    if(oldClubId != newClubId){
      this._init(newClubId);
    }
  };

  _init = (clubId) => {
    console.log("in init of TablesBreakOut of Club: ", clubId);
    document.title = `Show Club ${clubId}`;
    this.props.getClub();
    this.props.getMembersCheckedInToday();
  };

  _print = () => {
    window.print()
  };

  render() {
    const {clubId, club, match, members, updateMember,
      assignTablesStraightForClub,
      assignTablesEveryOtherForClub,
      assignTablesRandomForClub,
      getMembersCheckedInToday} = this.props;
    return <div>
      <PageHeader className={'no-print'}>
        Table Break Out
        <small> / of club - {club.name ? Capitalize(club.name) : ''} </small>
        <Button bsStyle="success" style={{float:'right', marginLeft: 20}}
                onClick={this._print} >
          Print
        </Button>
        <Button bsStyle="primary" style={{float:'right'}}
                onClick={getMembersCheckedInToday} >
          Reload Members
        </Button>
      </PageHeader>
      <AllPlayTables members={members}
                     assignTablesStraightForClub={assignTablesStraightForClub}
                     assignTablesEveryOtherForClub={assignTablesEveryOtherForClub}
                     assignTablesRandomForClub={assignTablesRandomForClub}
                     updateMember={updateMember} />
    </div>;
  };

};

TablesBreakOut = connect(mapStateToProps, mapDispatchToProps)(TablesBreakOut);

export default TablesBreakOut;