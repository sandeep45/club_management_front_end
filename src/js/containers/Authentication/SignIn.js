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
    signIn: actions.signIn
  }, dispatch);
};

class SignIn extends Component {
  constructor(props) {
    super(props);
  };

  componentWillMount(){
    console.log("SignIn Container has mounted");
    this._init();
  };

  componentWillReceiveProps(nextProps){

  };

  static defaultProps = {

  };

  static propTypes = {
    signIn: PropTypes.func.isRequired,
  };

  _init = () => {
    console.log("in init of SignIn");
    document.title = `Sign In`;
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

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" onClick={this._submitClicked}>
                Sign in
              </Button>
            </Col>
          </FormGroup>
        </Form>
        {/*<CameraScanner/>*/}
      </div>
    );
  };

  _submitClicked = (e) => {
    const {signIn} = this.props;
    console.log("submit has been clicked");
    e.preventDefault();
    const that = this;
    signIn({
      email: this._email.value,
      password: this._password.value
    });
  }
};

SignIn = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default SignIn;