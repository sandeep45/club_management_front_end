import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../action_creators';
import * as reducers from '../../reducers'
import {Form, FormGroup, Col, ControlLabel, FormControl, Button} from 'react-bootstrap'
import PropTypes from 'prop-types';
import CameraScanner from "../../components/Generic/CameraScanner";

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({
    signUp: actions.signUp
  }, dispatch);
};

class SignUp extends Component {
  constructor(props) {
    super(props);
  };
  
  componentWillMount(){
    console.log("SignUp Container has mounted");
    this._init();
  };
  
  componentWillReceiveProps(nextProps){
  
  };
  
  static defaultProps = {
  
  };
  
  static propTypes = {
    signUp: PropTypes.func.isRequired,
  };
  
  _init = () => {
    console.log("in init of SignUp");
    document.title = `Sign Up`;
  };
  
  render() {
    return (
      <div>
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email"
                           inputRef={ref => { this._email = ref; }} />
            </Col>
          </FormGroup>
          
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl type="password" placeholder="Password"
                           inputRef={ref => { this._password = ref; }} />
            </Col>
          </FormGroup>
  
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password Confirmation
            </Col>
            <Col sm={10}>
              <FormControl type="password" placeholder="Password"
                           inputRef={ref => { this._password_confirmation = ref; }} />
            </Col>
          </FormGroup>
  
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
            
            </Col>
            <Col sm={10}>
              By clicking Sign Up, you agree to our{' '}
              <a href="#tos">Terms of Use</a>, and{' '}
              <a href="#pp">Privacy Policy</a>.
            </Col>
          </FormGroup>
  
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" onClick={this._submitClicked} bsStyle='primary'>
                Sign Up
              </Button>
            </Col>
          </FormGroup>
        </Form>
        {/*<CameraScanner/>*/}
      </div>
    );
  };
  
  _submitClicked = (e) => {
    const {signUp} = this.props;
    console.log("submit has been clicked");
    e.preventDefault();
    const that = this;
    signUp({
      email: this._email.value,
      password: this._password.value,
      password_confirmation: this._password_confirmation.value
    });
  }
};

SignUp = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUp;