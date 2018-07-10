import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import ConfirmationModal from "../Generic/ConfirmationModal";
import * as fromConstants from "../../constants";

class ManualCheckinBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrCode: "",
    }
  };

  static defaultProps = {
    updateQrCode: (num) => alert(num),
  };

  static propTypes = {
    updateQrCode: PropTypes.func,
  };

  render() {
    const {qrCode} = this.state;

    return (
      <input type='text'
             autoFocus
             onChange={this._handleInput}
             onKeyPress={this._handleEnter}
             value={qrCode}
             placeholder="Place Cursor here for Scanner to Work!"
             style={{width: '100%', padding: 10, margin: 10}}
             ref={c => this._input = c}>
      </input>
    );
  };

  _handleInput = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({qrCode: e.target.value});
  };

  _handleEnter = (e) => {
    const {updateQrCode} = this.props;
    console.log(e.key);
    if(e.key == 'Enter') {
      console.log("submit & clear the box");
      this.setState({qrCode: ""});
      this._beep()
      updateQrCode(this.state.qrCode);
    }
  };

  _beep = () => new Audio(fromConstants.BEEP).play();

};

export default ManualCheckinBox