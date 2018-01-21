import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../action_creators';
import * as reducers from '../../reducers'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { push } from 'react-router-redux'
import MemberForm from '../../components/Member/MemberForm'
import {Button, PageHeader} from 'react-bootstrap'

const mapStateToProps = (state, ownProps) => {
  const memberId = ownProps.match.params.memberId;
  const member = reducers.getMemberFromIdInUrl(state, ownProps);
  return {
    member,
    memberId
  };
  return {memberId, member};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const memberId = ownProps.match.params.memberId;
  const clubId = ownProps.match.params.clubId;
  return bindActionCreators({
    getMember: actions.getMember.bind(this, clubId, memberId),
    formAction: (obj) => actions.updateMember(clubId, memberId, obj),
    goToAfterAction: () => push(`/clubs/${clubId}/members`),
    goToMembersIndexPage: () => push(`/clubs/${clubId}/members`),
  }, dispatch);
};

class EditMember extends Component {
  constructor(props) {
    super(props);
  };

  componentWillMount(){
    console.log("EditMember Container has mounted");
    const memberId = this.props.match.params.memberId;
    this._init(memberId);
  };

  componentWillReceiveProps(nextProps){
    const oldMemberId = this.props.match.params.memberId;
    const newMemberId = nextProps.match.params.memberId;
    console.log("Member has been updated. Old Id: ", oldMemberId, " and New Id: ", newMemberId);
    if(oldMemberId != newMemberId){
      this._init(newMemberId);
    }
  };

  _init = (memberId) => {
    console.log("in init of Edit Member: ", memberId);
    this.props.getMember();
    document.title = `Edit Member ${memberId}`;
  };

  render() {
    const {memberId, goToMembersIndexPage} = this.props;
    return (
      <div>
        <PageHeader>Edit Member <small> / {memberId}</small></PageHeader>
        <MemberForm {...this.props} />

        <hr />
        <Button bsStyle="default"
                onClick={goToMembersIndexPage}>
          View All Members
        </Button>{" "}
      </div>
    );
  };
};

EditMember = connect(mapStateToProps, mapDispatchToProps)(EditMember);

export default EditMember;