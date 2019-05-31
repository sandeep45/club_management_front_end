import { Button, ControlLabel, FormControl, FormGroup, Modal, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class UpdateCheckinModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkin: props.checkin
    }
  };
  
  componentWillReceiveProps(nextProps){
    if(nextProps.checkin != this.props.checkin){
      this.setState({
        checkin: nextProps.checkin
      })
    }
  };
  
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    updateCheckin: PropTypes.func,
    checkin: PropTypes.object.isRequired
  };
  
  static defaultProps = {
    visible: false
  };
  
  render() {
    const {visible, closeModal} = this.props;
    const {checkin} = this.state;
    
    return (
      <Modal show={visible} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Checkin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId='amount'>
              <ControlLabel>Amount</ControlLabel>
              <FormControl type='text'
                           onChange={this._inputChanged}
                           inputRef={c => this._amountInput = c}
                           value={checkin.amount_collected} />
            </FormGroup>
            <FormGroup controlId='paid'>
              <ControlLabel>Paid</ControlLabel>
              <select value={checkin.paid} onChange={this._inputChanged}
                      ref={c => this._paidInput= c}
                      className={`form-control`}
              >
                <option value="true">yes</option>
                <option value="false">no</option>
              </select>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal} bsStyle='default'>Cancel</Button>
          <Button onClick={this._updateCheckin} bsStyle='primary'>Update</Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
  _inputChanged = () => {
    this.setState({
      checkin: {
        amount_collected: this._amountInput.value,
        paid: this._paidInput.value,
      }
    })
  } ;
  
  _updateCheckin = () => {
    const {updateCheckin, checkin, closeModal} = this.props;
    updateCheckin(checkin, {
      amount_collected: this.state.checkin.amount_collected,
      paid: this.state.checkin.paid
    })
    closeModal();
  };
}

export default UpdateCheckinModal