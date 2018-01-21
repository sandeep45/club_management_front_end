import {Button, Modal, OverlayTrigger, Popover, Tooltip} from 'react-bootstrap'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NotificationModal extends Component {
  constructor(props) {
    super(props);
  };

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    title: PropTypes.string
  };

  static defaultProps = {
    visible: false,
    title: "Alert"
  };

  render() {
    const {visible, closeModal, title} = this.props;

    return (
      <Modal show={visible} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.children ? this.props.children : <h4>Processed</h4>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal} bsStyle='primary'>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };
}

export default NotificationModal