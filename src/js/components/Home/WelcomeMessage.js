import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Button, Jumbotron} from "react-bootstrap";

class WelcomeMessage extends Component {
  constructor(props) {
    super(props)
  };

  static propTypes = {
    goToPage: PropTypes.func.isRequired
  };

  render() {
    const {goToPage} = this.props;
    return (
      <div className='container'>
        <Jumbotron style={{marginTop: 20}}>
          <h1>Ping Pong Club Management</h1>
          <p>Software to manage your ping pong club. Create multiple leagues, add members, automate player check-in via sms or bar code and print play formats.</p>
          <p>
            <Button bsStyle="primary">
              Learn More
            </Button>{" "}
            <Button bsStyle="success"
                    onClick={goToPage.bind(this, "/authentication/sign_in")}>
              Sign In
            </Button>
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default WelcomeMessage