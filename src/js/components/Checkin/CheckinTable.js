import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import ConfirmationModal from "../Generic/ConfirmationModal";

class CheckinTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteConfirmationModal: false,
      checkinToBeDeleted: null
    }
  };

  static defaultProps = {
    checkins: [],
    membersHash: {}
  };

  static propTypes = {
    checkins: PropTypes.array.isRequired,
    membersHash: PropTypes.object.isRequired,
    removeCheckin: PropTypes.func.isRequired,
    clubId: PropTypes.number.isRequired,
  };

  render() {
    const {checkins, membersHash} = this.props;
    console.log("membersHash: ", membersHash);
    console.log("checkins: ", checkins);
    return (
        <Table striped bordered condensed hover responsive>
          <thead>
            <tr>
              <th>Member Id</th>
              <th>Member Name</th>
              <th>Member Email</th>
              <th>Member Membership Type</th>
              <th>Member QR Code Number</th>
              <th>Checkin Created At</th>
              <th>Checkin Updated At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {checkins.map(checkin => {
              return (
                <tr key={checkin.id}>
                  <td>{checkin.id}</td>
                  <td>
                    {membersHash[checkin.member_id].name}
                  </td>
                  <td>
                    {membersHash[checkin.member_id].email}
                  </td>
                  <td>
                    {membersHash[checkin.member_id].full_time ? "Full-Time" : "Part-Time"}
                  </td>
                  <td>
                    {membersHash[checkin.member_id].qr_code_number}
                  </td>
                  <td>{checkin.created_at}</td>
                  <td>{checkin.updated_at}</td>
                  <td>
                    <Button bsStyle="danger"
                            onClick={this._showDeleteConfirmationModal.bind(this, checkin)}
                            >
                      Delete this Checkin!
                    </Button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <ConfirmationModal visible={this.state.showDeleteConfirmationModal}
                             closeModal={() => this.setState({showDeleteConfirmationModal: false})}
                             actionButtonClicked={this._deleteCheckin}/>
        </Table>
    );
  };

  _showDeleteConfirmationModal = (checkin) => {
    this.setState({checkinToBeDeleted: checkin});
    this.setState({showDeleteConfirmationModal: true});
  };

  _deleteCheckin = () => {
    const {checkinToBeDeleted} = this.state;
    const {clubId, removeCheckin} = this.props;
    console.log("deleting of checkin has been confirmed for checkin:", checkinToBeDeleted);
    removeCheckin(clubId, checkinToBeDeleted.member_id, checkinToBeDeleted.id);
    this.setState({ showDeleteConfirmationModal: false });
  }
};

export default CheckinTable