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

class ForgotPassword extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h1>ForgotPassword <small>/ lorem lipsum</small></h1>
        </div>
      </div>
    );
  }
}

ForgotPassword = connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

export default ForgotPassword