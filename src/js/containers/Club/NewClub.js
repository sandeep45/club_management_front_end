import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../action_creators';
import * as reducers from '../../reducers'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { push } from 'react-router-redux'
import ClubForm from '../../components/Club/ClubForm'
import {PageHeader} from "react-bootstrap";

const mapStateToProps = (state, ownProps) => {
  return { };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    goToAfterAction: () => push("/clubs"),
    formAction: (obj) => actions.createClub(obj),
  }, dispatch);
};

class NewClub extends Component {
  constructor(props) {
    super(props)
  };

  componentWillMount(){
    console.log("NewClub Container has mounted");
  };

  componentWillReceiveProps(nextProps){
  };

  _init = () => {
    document.title = `New Club `;
  };

  render() {
    const {} = this.props;
    return (
      <div>
        <PageHeader>Create a new Club <small> </small></PageHeader>
        <ClubForm {...this.props} />
      </div>
    );
  };
};

NewClub = connect(mapStateToProps, mapDispatchToProps)(NewClub);

export default NewClub;