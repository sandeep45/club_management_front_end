import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, Button, Col, Row} from 'react-bootstrap'

class GroupOfThree extends Component {
  constructor(props) {
    super(props);
  };
  
  static defaultProps = {};
  
  static propTypes = {};
  
  render() {
    return <div className={`printable hidden container-responsive`}>
      <h4>Play Order</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th> Round 1</th>
            <th> Round 2</th>
            <th> Round 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> 1 vs 3</td>
            <td> 2 vs 3</td>
            <td> 1 vs 2</td>
          </tr>
        </tbody>
      </Table>
    </div>
  }
}

export default GroupOfThree;