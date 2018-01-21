import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as actions from '../../action_creators';
import * as reducers from '../../reducers'

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

class SignOut extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h1>SignOut <small>/ Coming Soon</small></h1>
        </div>
      </div>
    );
  }
}

SignOut = connect(mapStateToProps, mapDispatchToProps)(SignOut);

export default SignOut