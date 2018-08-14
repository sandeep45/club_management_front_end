import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, Bootstrap, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import NotificationModal from "../Generic/NotificationModal";

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
        <Table striped borderedhover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Rating</th>
              <th>USATT</th>
              <th>Membership Type</th>
              <th>Phone Number</th>
              <th>QR Code Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => {
              return (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.league_rating}</td>
                  <td>{member.usatt_number}</td>
                  <td>{member.full_time == true ? "Full Time" : "Part Time"}</td>
                  <td>{member.phone_number}</td>
                  <td>{member.qr_code_number}</td>
                  <td>
                    <Link to={`${match.url}/${member.id}`}>Show</Link>{" | "}
                    <Link to={`${match.url}/${member.id}/edit`}>Edit</Link>{" | "}
                    <Link to={`${match.url}/${member.id}/checkins`}>View Checkins</Link>{" | "}
                    <Button onClick={this._createCheckin.bind(this, member)}  bsStyle="success">
                      Do Check-in
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <NotificationModal visible={showCheckinNotificationModal}
                             closeModal={this._hideCheckinNotificationModal}
                             title={checkinResponseStatusCode == "201" ? "New Checkin Created" : "Already checked in"}>
            <p>Welcome {checkedInMember.name} / {checkedInMember.email} / {checkedInMember.id} </p>
            <p>Full Time Member: {checkedInMember.full_time ==  true ? "Yes" : "No" }</p>
            <p>{ (checkinResponseStatusCode == "201") && (checkedInMember.full_time == false) ? "Please make Payment" : "No Payment due"}</p>
          </NotificationModal>
        </Table>
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