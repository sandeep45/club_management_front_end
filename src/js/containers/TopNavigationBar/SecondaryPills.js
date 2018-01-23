import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import {push} from "react-router-redux";

import * as actions from '../../action_creators';
import * as reducers from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  let clubId = 0;
  if(ownProps.match && ownProps.match.params && ownProps.match.params.clubId){
    clubId = ownProps.match.params.clubId;
  }
  return {
    clubId
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    goToPage: (url) => push(url),
  }, dispatch);
};

class SecondaryPills extends Component {
  constructor(props) {
    super(props);
  };

  componentWillMount(){
  };

  componentWillReceiveProps(nextProps){

  };

  render() {
    const {clubId, goToPage} = this.props;
    return <div>
      <ul class="nav nav-pills">
        <li>
          <a href="javascript:void(0);" onClick={goToPage.bind(this, `/clubs/${clubId}/members`)}>Members</a>
        </li>
        <li>
          <a href="javascript:void(0);" onClick={goToPage.bind(this, `/clubs/${clubId}/checkins/dashboard`)}>
            Checkins Dashboard
          </a>
        </li>
      </ul>
    </div>;
  };

};

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryPills);