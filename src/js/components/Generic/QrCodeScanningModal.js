import {Button, Modal, OverlayTrigger, Popover, Tooltip} from 'react-bootstrap'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CameraScanner from "./CameraScanner";

class QrCodeScanningModal extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    updateQrCode: PropTypes.func.isRequired,
  };

  static defaultProps = {
    visible: false,
  };

  render() {
    const {visible, closeModal, updateQrCode} = this.props;
    return (
      <Modal show={visible} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Scan QR Code</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <h4>Please place QR code in front of the camera</h4>
          <CameraScanner updateQrCode={updateQrCode} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default QrCodeScanningModal