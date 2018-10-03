import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Route, Link, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import * as actions from '../../action_creators';
import * as reducers from '../../reducers';

import NotFound from "../../components/Generic/NotFound";
import AllPlayDates from "./AllPlayDates";

const mapStateToProps = (state, ownProps) => {
  const {match} = ownProps;
  return {
    match
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    goToPage: url => push(url)
  }, dispatch);
};

class PlayDateContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {match} = this.props;
    return (
      <div className="container">
        <Switch>
          <Route exact path={match.path} component={AllPlayDates}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

PlayDateContainer = connect(mapStateToProps, mapDispatchToProps)(PlayDateContainer);

export default PlayDateContainer