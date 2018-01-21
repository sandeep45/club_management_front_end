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

const mapStateToProps = (state, ownProps) => {
  const clubId = ownProps.match.params.clubId;
  const club = reducers.getClubFromIdInUrl(state, ownProps);
  return {
    club,
    clubId
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    getClub: actions.getClub,
    removeClub :actions.removeClub,
    goToClubsIndexPage: () => push("/clubs"),
  }, dispatch);
};

class ShowClub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  };

  componentWillMount(){
    console.log("ShowClub Container has mounted");
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
    console.log("in init of Show Club: ", clubId);
    this.props.getClub(clubId);
    document.title = `Show Club ${clubId}`;
  };

  render() {
    const {clubId, club, match} = this.props;
    return <div>
      <PageHeader>Showing Club <small> / {clubId}</small>
      </PageHeader>

      <Panel header="Club Details" bsStyle="primary">
        <ListGroup fill>
          <ListGroupItem>Id: {clubId}</ListGroupItem>
          <ListGroupItem>name: {club.name} </ListGroupItem>
        </ListGroup>
      </Panel>

      <Button bsStyle="danger"
              onClick={() => this.setState({showModal: true})}>
        Delete this Club!
      </Button>{" "}
      <Link className="btn btn-primary" to={`${match.url}/members`}>
        View Members
      </Link>{" "}
      <Link className="btn btn-default" to={`/clubs`}>
        View All Clubs
      </Link>
      <ConfirmationModal visible={this.state.showModal}
                         closeModal={() => this.setState({showModal: false})}
                         actionButtonClicked={this._deleteClub}/>
    </div>;
  };

  _deleteClub= (e) => {
    const {clubId, club, removeClub, goToClubsIndexPage} = this.props;
    console.log("delete has been clicked: ", clubId, clubId);
    removeClub(clubId).then(
      response => {
        console.log("club has been deleted. now moving to listing page: ", clubId);
        goToClubsIndexPage();
      }
    );
    this.setState({ showModal: false });
  };

};

ShowClub = connect(mapStateToProps, mapDispatchToProps)(ShowClub);

export default ShowClub;