import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, FormGroup, HelpBlock, FormControl, ControlLabel, Button, Form, InputGroup, DropdownButton, MenuItem} from 'react-bootstrap'
import QrCodeScanningModal from "../Generic/QrCodeScanningModal";
import PhoneFormatter from 'phone-formatter'
import * as WebUtil from '../../web_util'
import _ from 'lodash'

class MemberForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: props.member,
      showQrScanningModal: false,
      memberGlobalSearchResult: {}
    }
    this._memberGlobalSearch = _.debounce(this._memberGlobalSearch, 2000, {
      leading: false,
      maxWait: 10000,
      trailing: true
    })
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.member != this.props.member){
      this.setState({
        member: nextProps.member
      })
    }
  };

  static defaultProps = {
    member: {
      name: '',
      email: '',
      membership_kind: '',
      phone_number: '',
      qr_code_number: '',
      league_rating: '',
      usatt_number: '',
      table_number: '',
      notes: '',
    }
  };

  static propTypes = {
    memberId: PropTypes.number,
    member: PropTypes.object,
    formAction: PropTypes.func.isRequired,
    goToAfterAction: PropTypes.func.isRequired,
  };

  render() {
    const {member, memberGlobalSearchResult} = this.state;
    const {showQrScanningModal} = this.state;
    return (
      <div>
        <form>
          <FormGroup controlId='nameBox'>
            <ControlLabel>Name</ControlLabel>
            <FormControl type='text' placeholder='John Doe'
                         inputRef={c => this._nameInput = c} value={member.name}
                         onChange={this._nameChanged }/>
          </FormGroup>
          <FormGroup controlId='emailBox'>
            <ControlLabel>Email</ControlLabel>
            <FormControl type='text' placeholder='John.Doe@example.com'
                         inputRef={c => this._emailInput = c} value={member.email}
                         onChange={this._emailChanged}
            />
          </FormGroup>
          <FormGroup controlId='leagueRatingBox'>
            <ControlLabel>Rating</ControlLabel>
            <FormControl type='text' placeholder='2500'
                         inputRef={c => this._leagueRatingInput = c} value={member.league_rating}
                         onChange={this._leagueRatingChanged}/>
          </FormGroup>
          <FormGroup controlId='usattNumberlBox'>
            <ControlLabel>USATT Number</ControlLabel>
            <FormControl type='text' placeholder='12345'
                         inputRef={c => this._usattNumberInput = c} value={member.usatt_number}
                         onChange={this._usattNumberChanged}/>
          </FormGroup>
          <FormGroup controlId='membershipTypeBox'>
            <ControlLabel>Status</ControlLabel>
            <select value={member.membership_kind} onChange={this._membershipTypeChanged}
                    ref={c => this._membershipType= c}
                    className={`form-control`}
            >
              <option value="part_time">Part Time</option>
              <option value="full_time">Full Time</option>
              <option value="complimentary">Complimentary</option>
            </select>
          </FormGroup>
          <FormGroup controlId='phoneNumberBox'>
            <ControlLabel>Phone #</ControlLabel>
            <FormControl type='text' placeholder='123-123-1234'
                         inputRef={c => this._phoneNumberInput = c}
                         value={member.phone_number}
                         onChange={this._phoneNumberChanged} />
          </FormGroup>
          <FormGroup controlId='qrCodeNumberBox'>
            <ControlLabel>QR Code # – {this._memberExistsNotification()}</ControlLabel>
            <FormControl type='text' placeholder='12345'
                         inputRef={c => this._qrCodeNumberInput = c}
                         value={member.qr_code_number}
                         onChange={this._qrCodeNumberChanged}/>
          </FormGroup>
          <FormGroup controlId='TableNumberBox' className={'hidden'}>
            <ControlLabel>Table #</ControlLabel>
            <FormControl type='text' placeholder='5'
                         inputRef={c => this._tableNumberInput = c}
                         value={member.table_number}
                         onChange={this._tableNumberChanged} />
          </FormGroup>
          <FormGroup controlId='NotesBox'>
            <ControlLabel>Notes</ControlLabel>
            <FormControl componentClass='textarea'
                         placeholder='Type here anything you want to be reminded on, e.g. this guy owes me $2.50'
                         inputRef={c => this._notesInput = c}
                         value={member.notes || ''}
                         onChange={this._notesChanged} />
          </FormGroup>
          <Button type="submit" onClick={this._submitClickHandler} bsStyle='primary'>
            Submit
          </Button>
        </form>
        <QrCodeScanningModal visible={showQrScanningModal} closeModal={this._hideQrScanningModal}
                             updateQrCode={this._qrCodeNumberChangedViaScan}/>
      </div>
    );
  };

  _memberExistsNotification = () => {
    const {memberGlobalSearchResult} = this.state;
    if(memberGlobalSearchResult.success){
      return (
        `A QR Code has already been issued from club – ${memberGlobalSearchResult.club_keyword}. There is no need to issue a new QR Code.`
      );
    }else {
      return (
        `Please issue a new QR code and scan its value below.`
      )
    }
  }
  
  _nameChanged = e => {
    const member = {...this.state.member, name: e.target.value};
    this.setState({member});
  };

  _emailChanged = e => {
    const member = {...this.state.member, email: e.target.value};
    this.setState({member});
    this._memberGlobalSearch();
  };

  _phoneNumberChanged = e => {
    const member = {...this.state.member, phone_number: e.target.value};
    this.setState({member});
    this._memberGlobalSearch();
  };
  _membershipTypeChanged = e => {
    const member = {...this.state.member, membership_kind: e.target.value};
    this.setState({member});
  };
  _leagueRatingChanged = e => {
    const member = {...this.state.member, league_rating: e.target.value};
    this.setState({member});
  };
  _usattNumberChanged = e => {
    const member = {...this.state.member, usatt_number: e.target.value};
    this.setState({member});
  };
  _qrCodeNumberChanged = e => {
    const member = {...this.state.member, qr_code_number: e.target.value};
    this.setState({member});
  };
  _tableNumberChanged = e => {
    const member = {...this.state.member, table_number: e.target.value};
    this.setState({member});
  };
  _notesChanged = e => {
    const member = {...this.state.member, notes: e.target.value};
    this.setState({member});
  };

  _qrCodeNumberChangedViaScan = num => {
    const member = {...this.state.member, qr_code_number: num};
    this.setState({member});
    this._hideQrScanningModal();
  };

  _submitClickHandler = evt => {
    evt.preventDefault();
    const {formAction, goToAfterAction} = this.props;
    console.log("on click of submit button: ");
    formAction({
      name: this._nameInput.value,
      email: this._emailInput.value,
      phone_number: this._phoneNumberInput.value ? PhoneFormatter.normalize(this._phoneNumberInput.value) : '',
      qr_code_number: this._qrCodeNumberInput.value,
      membership_kind: this._membershipType.value,
      usatt_number: this._usattNumberInput.value,
      league_rating: this._leagueRatingInput.value,
      table_number: this._tableNumberInput.value,
      notes: this._notesInput.value,
    }).then(
      response => {
        console.log("form action has been fired. now moving to listing page");
        goToAfterAction();
      },
      error => {
        console.error("form action failed: ", error);
        alert("Error: " + error);
      }
    )
  };

  _hideQrScanningModal = evt => this.setState({ showQrScanningModal: false });
  _showQrScanningModal = evt => this.setState({ showQrScanningModal: true });

  _memberGlobalSearch = () => {
    const {email, phone_number} = this.state.member;
    console.log('doing global search with: ', email, phone_number);
    WebUtil.globalSearch(email, phone_number).then(response => {
      console.log(response.data);
      if(response && response.data){
        this.setState({
          memberGlobalSearchResult: response.data
        });
        const member = {...this.state.member, qr_code_number: response.data.qr_code_number};
        this.setState({member});
      }
    },
    error => {
      console.log(error);
    })
  }
};

export default MemberForm