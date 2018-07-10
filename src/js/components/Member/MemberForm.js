import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, FormGroup, HelpBlock, FormControl, ControlLabel, Button, Form, InputGroup, DropdownButton, MenuItem} from 'react-bootstrap'
import QrCodeScanningModal from "../Generic/QrCodeScanningModal";
import PhoneFormatter from 'phone-formatter'


class MemberForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: props.member,
      showQrScanningModal: false
    }
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
      full_time: '',
      phone_number: '',
      qr_code_number: '',
      rating: '',
    }
  };

  static propTypes = {
    memberId: PropTypes.number,
    member: PropTypes.object,
    formAction: PropTypes.func.isRequired,
    goToAfterAction: PropTypes.func.isRequired,
  };

  render() {
    const {member} = this.state;
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
                         onChange={this._emailChanged}/>
          </FormGroup>
          <FormGroup controlId='fullTimeBox'>
            <ControlLabel>Status</ControlLabel>
            <select value={member.full_time} onChange={this._fullTimeChanged}
                    ref={c => this._fullTimeInput= c}
                    style={{marginLeft: 10}}
            >
              <option value="true">Full Time</option>
              <option value="false">Part Time</option>
            </select>
          </FormGroup>
          <FormGroup controlId='phoneNumberBox'>
            <ControlLabel>Phone #</ControlLabel>
            <FormControl type='text' placeholder='123-123-1234'
                         inputRef={c => this._phoneNumberInput = c}
                         value={member.phone_number}
                         onChange={this._phoneNumberChanged} />
          </FormGroup>
          <FormGroup controlId='ratingBox'>
            <ControlLabel>Rating</ControlLabel>
            <FormControl type='text' placeholder='1500'
                         inputRef={c => this._ratingInput = c} value={member.rating}
                         onChange={this._ratingChanged} />
          </FormGroup>
          <FormGroup controlId='qrCodeNumberBox'>
            <ControlLabel>QR Code Number</ControlLabel>
            <InputGroup>
              <InputGroup.Button>
                <Button bsStyle='default' onClick={this._showQrScanningModal}>Scan Code</Button>
              </InputGroup.Button>
              <FormControl type='text' placeholder='John.Doe@example.com'
                           inputRef={c => this._qrCodeNumberInput = c} value={member.qr_code_number}
                           onChange={this._qrCodeNumberChanged}/>
            </InputGroup>
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

  _nameChanged = e => {
    const member = {...this.state.member, name: e.target.value};
    this.setState({member});
  };

  _emailChanged = e => {
    const member = {...this.state.member, email: e.target.value};
    this.setState({member});
  };

  _phoneNumberChanged = e => {
    const member = {...this.state.member, phone_number: e.target.value};
    this.setState({member});
  };
  _fullTimeChanged = e => {
    const member = {...this.state.member, full_time: e.target.value};
    this.setState({member});
  };

  _qrCodeNumberChanged = e => {
    const member = {...this.state.member, qr_code_number: e.target.value};
    this.setState({member});
  };

  _ratingChanged = e => {
    const member = {...this.state.member, rating: e.target.value};
    this.setState({member});
  };

  _qrCodeNumberChangedViaScan = num => {
    const member = {...this.state.member, qr_code_number: num};
    this.setState({member});
    this._hideQrScanningModal();
  }

  _submitClickHandler = evt => {
    evt.preventDefault();
    const {formAction, goToAfterAction} = this.props;
    console.log("on click of submit button: ");
    formAction({
      name: this._nameInput.value,
      email: this._emailInput.value,
      phone_number: this._phoneNumberInput.value ? PhoneFormatter.normalize(this._phoneNumberInput.value) : '',
      qr_code_number: this._qrCodeNumberInput.value,
      rating: this._ratingInput.value,
      full_time: this._fullTimeInput.value,
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

};

export default MemberForm