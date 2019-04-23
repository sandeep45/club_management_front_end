import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, Button, Label} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import ConfirmationModal from "../Generic/ConfirmationModal";
import DateFormat from "dateformat";

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
    let {checkins, membersHash, checkedInMembers} = this.props;
    if(!checkedInMembers){
      checkedInMembers = [];
    }
    const partTimeCheckins = checkedInMembers.filter(m => m.membership_kind == 'part_time');
    const fullTimeCheckins = checkedInMembers.filter(m => m.membership_kind == 'full_time');
    const complimentaryCheckins = checkedInMembers.filter(m => m.membership_kind == 'complimentary');

    return (
      <div>
        <h4>
          <Label bsStyle="default">Total - {checkins.length}</Label>{' '}
          <Label bsStyle="danger">Part-Time - {partTimeCheckins.length}</Label>{' '}
          <Label bsStyle="success">Full-Time - {fullTimeCheckins.length}</Label>{' '}
          <Label bsStyle="info">Complimentary - {complimentaryCheckins.length}</Label>{' '}
        </h4>

        <Table striped borderedhover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Status</th>
              <th>QR Code</th>
              <th>Checkin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {checkins.map(checkin => {
              return (
                <tr key={checkin.id}>
                  <td className={`nowrap`}>
                    {membersHash[checkin.member_id].name}
                  </td>
                  <td className={`nowrap`}>
                    {membersHash[checkin.member_id].email}
                  </td>
                  <td>
                    {membersHash[checkin.member_id].league_rating}
                  </td>
                  <td>
                    {this._statusLabel(membersHash[checkin.member_id].membership_kind)}
                  </td>
                  <td>
                    {membersHash[checkin.member_id].qr_code_number}
                  </td>
                  <td>{DateFormat(checkin.created_at, "mm-dd-yy h:MM TT")}</td>
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
      </div>
    );
  };
  
  _statusLabel = (membership_kind) => {
    switch(membership_kind){
      case 'part_time':
        return <Label className='label-danger'>Part-Time</Label>;
      case 'full_time':
        return <Label className='label-success'>Full-Time</Label>;
      case 'complimentary':
        return <Label className='label-info'>Complimentary</Label>;
    }
  }

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