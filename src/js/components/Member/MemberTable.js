import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, Bootstrap, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import NotificationModal from "../Generic/NotificationModal";
import PhoneFormatter from 'phone-formatter'

class MemberTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckinNotificationModal: false,
      checkinResponseStatusCode: 201,
      checkedInMember: {
        name: "unknown"
      }
    }
  };

  static defaultProps = {
    members: [],
  };

  static propTypes = {
    members: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
    createCheckin: PropTypes.func.isRequired,
  };

  render() {
    const {members, match, searchFields} = this.props;
    const {showCheckinNotificationModal, checkedInMember, checkinResponseStatusCode} = this.state;
    return (
      <div>
        <h4>Total Members - {members.length}</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Membership Type</th>
              <th>Phone #</th>
              <th>QR Code #</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => {
              return (
                <tr key={member.id}>
                  <td className={`contained-column`}>{member.name}</td>
                  <td className={`contained-column`}>{member.email}</td>
                  <td>{member.league_rating}</td>
                  <td>{member.membership_kind}</td>
                  <td>{member.phone_number ? PhoneFormatter.format(member.phone_number, "(NNN) NNN-NNNN") : ''}</td>
                  <td>{member.qr_code_number}</td>
                  <td>
                    <Link to={`${match.url}/${member.id}/edit`}>Edit</Link>{" | "}
                    <Link to={`${match.url}/${member.id}`}>Show</Link>{" | "}
                    <Link to={`${match.url}/${member.id}/checkins`}>Checkins</Link>{" | "}
                    <a href="javascript:void(0);"
                       onClick={this._createCheckin.bind(this, member)}>
                        Do Check-in
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <NotificationModal visible={showCheckinNotificationModal}
                             closeModal={this._hideCheckinNotificationModal}
                             title={checkinResponseStatusCode == "201" ? "New Checkin Created" : "Already checked in"}>
            <p>Welcome {checkedInMember.name} / {checkedInMember.email} / {checkedInMember.id} </p>
            <p>Membership Type: {checkedInMember.membership_kind}</p>
            <p>{ (checkinResponseStatusCode == "201") && (checkedInMember.membership_kind == 'part_time') ? "Please make Payment" : "No Payment due"}</p>
          </NotificationModal>
        </Table>
      </div>
    );
  };

  _createCheckin = (member) => {
    const {createCheckin} = this.props;
    console.log("in _createCheckin with: ", member.id);
    this.setState({
      checkedInMember: member
    })
    createCheckin(member.id).then(
      response => {
        console.log("create checkin success for:" , member);
        this.setState({checkinResponseStatusCode: response.status});
        this._showCheckinNotificationModal();
      },
      error => {
        console.error("got error creating checkin");
        alert(error);
      }
    )
  };

  _hideCheckinNotificationModal = evt => this.setState({ showCheckinNotificationModal: false });
  _showCheckinNotificationModal = evt => this.setState({ showCheckinNotificationModal: true });

};

export default MemberTable