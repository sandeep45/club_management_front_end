import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Button, Jumbotron} from "react-bootstrap";

class NotFound extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object.isRequired
  };

  static defaultProps = {};

  render() {
    const {history} = this.props;
    return (
      <div className='container'>
        <Jumbotron style={{marginTop: 20}}>
          <h1>Page Not Found</h1>
          <p>The URL you navigated to does not exist. Please check your URL and try again.</p>
          <p>
            <Button bsStyle="primary" onClick={history.goBack}>
              Go Back
            </Button>
          </p>
        </Jumbotron>
      </div>
    );

  }
}

export default NotFound