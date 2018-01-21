import React, {Component} from 'react'
import Instascan from 'instascan'
import K, * as fromConstants from '../../constants'
import {Well, Panel} from 'react-bootstrap'
import PropTypes from 'prop-types'

class CameraScanner extends Component {
  constructor(props) {

    super(props);
  };

  static propTypes = {
    updateQrCode: PropTypes.func.isRequired,
  };

  static defaultProps = {
    updateQrCode: (num) => alert(num),
  };

  componentDidMount(){
    const {updateQrCode} = this.props;
    console.log("CameraScanner Component has mounted");
    const scannerOptions = {
      continuous: true,
      video: document.getElementById('preview')
    };
    this._scanner = new Instascan.Scanner(scannerOptions);
    window._scanner = this._scanner;
    this._scanner.addListener('scan', content => {
      console.log(content);
      this._beep().then(resp => updateQrCode(content));
    });
    const cameraDetectedCallback = cameras => {
      if (cameras.length > 0) {
        this._scanner.start(cameras[0]);
      } else {
        console.error('No cameras found.');
      }
    };
    Instascan.Camera.getCameras().
      then(cameraDetectedCallback).
      catch(function (e) {
        console.error(e);
      });
  };

  componentWillUnmount(){
    console.log("CameraScanner Component has unmounted");
    window.setTimeout(() => {
      window._scanner.stop();
    }, 1000);
    this._scanner.stop();
    window._scanner.stop();
    console.log("!!!!!!!");
  };

  render() {
    return (
      <video id="preview" style={{width:200,height:200}} className='img-thumbnail'></video>
    );
  };

  _beep = () => new Audio(fromConstants.BEEP).play();
}

export default CameraScanner