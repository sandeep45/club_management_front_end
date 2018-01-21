import {Button, Modal, OverlayTrigger, Popover, Tooltip} from 'react-bootstrap'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ConfirmationModal extends Component {
  constructor(props) {
    super(props);
  };

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    actionButtonClicked: PropTypes.func
  };

  static defaultProps = {
    visible: false,
  };

  render() {
    const {visible, closeModal, actionButtonClicked} = this.props;

    return (
      <Modal show={visible} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure?</h4>
          <p>Take a deep breath and decide your fate.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={actionButtonClicked} bsStyle='primary'>Yes</Button>
          <Button onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };
}

export default ConfirmationModal