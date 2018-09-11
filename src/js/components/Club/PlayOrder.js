import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, Button} from 'react-bootstrap'

class PlayOrder extends Component {
  constructor(props) {
    super(props);
  };

  static defaultProps = {
    numberOfPlayers: 0
  };

  static propTypes = {
    numberOfPlayers: PropTypes.number.isRequired
  };

  render() {
    const {numberOfPlayers} = this.props;

    return (
      <div className={`printable`}>
        <Table striped bordered hover condensed>
          <tbody>
          </tbody>
        </Table>
        <hr />
      </div>
    );
  };

};

export default PlayOrder