import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../action_creators';
import * as reducers from '../../reducers'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { push } from 'react-router-redux'
import ClubForm from '../../components/Club/ClubForm'
import {PageHeader} from 'react-bootstrap'

const mapStateToProps = (state, ownProps) => {
  const clubId = ownProps.match.params.clubId;
  const club = reducers.getClubFromIdInUrl(state, ownProps);
  return {
    club,
    clubId
  };
  return {clubId, club};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const clubId = ownProps.match.params.clubId;
  return bindActionCreators({
    getClub: actions.getClub,
    goToAfterAction: () => push("/clubs"),
    formAction: (obj) => actions.updateClub(clubId, obj),
  }, dispatch);
};

class EditClub extends Component {
  constructor(props) {
    super(props)
  };

  componentWillMount(){
    console.log("EditClub Container has mounted");
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
    console.log("in init of Edit Club: ", clubId);
    this.props.getClub(clubId);
    document.title = `Edit Club ${clubId}`;
  };

  render() {
    const {clubId} = this.props;
    return (
      <div>
        <PageHeader>Edit Club <small> / {clubId}</small></PageHeader>
        <ClubForm {...this.props} />
        <hr />
        <Link className="btn btn-default" to={`/clubs`}>
          Clubs
        </Link>{" "}
      </div>
    );
  };
};

EditClub = connect(mapStateToProps, mapDispatchToProps)(EditClub);

export default EditClub;