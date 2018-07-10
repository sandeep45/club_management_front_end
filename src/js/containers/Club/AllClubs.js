import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../action_creators';
import * as reducers from '../../reducers'

import ClubTable from '../../components/Club/ClubTable'
import {PageHeader, Button} from 'react-bootstrap'
import {push} from "react-router-redux";

const mapStateToProps = (state, ownProps) => {
  const clubsArray = reducers.getClubsArray(state);
  return {
    clubs: clubsArray,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    getClubs: actions.getClubs,
    removeClub: actions.removeClub,
    goToPage: url => push(url)
  }, dispatch);
};

class AllClubs extends Component {
  constructor(props) {
    super(props)
  };

  componentWillMount(){
    console.log("AllClubs Container has mounted");
    this._init();
  };

  _init = () => {
    this.props.getClubs();
    document.title = `Clubs`;
  };

  render() {
    const {goToPage} = this.props;
    return (
      <div>
        <PageHeader>
          Clubs
          <small> / select one</small>
          <Button bsStyle='primary' style={{float:'right'}}
                  onClick={goToPage.bind(this, "/clubs/new")}>
            Create New Club
          </Button>
        </PageHeader>
        <ClubTable {...this.props} />
        <hr/>
      </div>
    );
  };
};

AllClubs = connect(mapStateToProps, mapDispatchToProps)(AllClubs);

export default AllClubs;