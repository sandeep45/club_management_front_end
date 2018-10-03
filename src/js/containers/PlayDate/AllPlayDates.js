import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../action_creators';
import * as reducers from '../../reducers'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { push } from 'react-router-redux'
import {Button, PageHeader, Panel, ListGroup, ListGroupItem} from 'react-bootstrap'


const mapStateToProps = (state, ownProps) => {

}

const mapDispatchToProps = (dispatch, ownProps) => {
  
}

class AllPlayDates extends Component {
  constructor(props) {
    super(props);
  };

  componentWillMount(){
    console.log("AllPlayDates Container has mounted");
    this._init();
  };

  _init = () => {
    // this.props.getPlayDates();
    document.title = `All Play Dates`;
  };

  render() {
    const { } = this.props;
    return (
      <div>
        <h1>We Manage Play Dates Here - COMING SOON!</h1>
      </div>
    );
  }
}

AllPlayDates = connect(mapStateToProps, mapDispatchToProps)(AllPlayDates);

export default AllPlayDates;