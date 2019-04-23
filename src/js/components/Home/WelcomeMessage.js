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
          <h1>Table Tennis League Management</h1>
          <p>This is software to manage your league. Here you can track your members, automate player check-in via text messaging or bar code scanning at location,
            distribute players as per their rating among groups, assign them to tables, print play order sheets etc.</p>
          <p>
            <Button bsStyle="primary"
                    onClick={goToPage.bind(this, "/authentication/sign_up")}>
              Sign Up
            </Button>{" "}
            <Button bsStyle="success"
                    onClick={goToPage.bind(this, "/authentication/sign_in")}>
              Sign In
            </Button>{" "}
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default WelcomeMessage