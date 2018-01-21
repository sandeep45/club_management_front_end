import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../action_creators';
import * as reducers from '../../reducers'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { push } from 'react-router-redux'
import MemberForm from '../../components/Member/MemberForm'
import {PageHeader} from "react-bootstrap";

const mapStateToProps = (state, ownProps) => {
  return { };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const clubId = ownProps.match.params.clubId;

  return bindActionCreators({
    goToAfterAction: () => push(`/clubs/${clubId}/members`),
    formAction: (obj) => actions.createMember(clubId, obj),
  }, dispatch);
};

class NewMember extends Component {
  constructor(props) {
    super(props)
  };

  componentWillMount(){
    console.log("NewMember Container has mounted");
  };

  componentWillReceiveProps(nextProps){
  };

  _init = () => {
    document.title = `New Member `;
  };

  render() {
    const {} = this.props;
    return (
      <div>
        <PageHeader>Create a new Member <small> </small></PageHeader>
        <MemberForm {...this.props} />
      </div>
    );
  };
};

NewMember = connect(mapStateToProps, mapDispatchToProps)(NewMember);

export default NewMember;