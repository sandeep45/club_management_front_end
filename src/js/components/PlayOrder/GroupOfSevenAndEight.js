import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, Button, Col, Row} from 'react-bootstrap'

class GroupOfSevenAndEight extends Component {
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
          <th> Round 4</th>
          <th> Round 5</th>
          <th> Round 6</th>
          <th> Round 7</th>
        </tr>
        </thead>
        
        <tbody>
        <tr>
          <td> 1 vs 8</td>
          <td> 1 vs 7</td>
          <td> 1 vs 6</td>
          <td> 1 vs 5</td>
          <td> 1 vs 4</td>
          <td> 1 vs 3</td>
          <td> 1 vs 2</td>
        </tr>
        <tr>
          <td> 2 vs 7</td>
          <td> 6 vs 8</td>
          <td> 5 vs 7</td>
          <td> 4 vs 6</td>
          <td> 3 vs 5</td>
          <td> 2 vs 4</td>
          <td> 3 vs 8</td>
        </tr>
        <tr>
          <td> 3 vs 6</td>
          <td> 2 vs 5</td>
          <td> 4 vs 8</td>
          <td> 3 vs 7</td>
          <td> 2 vs 6</td>
          <td> 5 vs 8</td>
          <td> 4 vs 7</td>
        </tr>
        <tr>
          <td> 4 vs 5</td>
          <td> 3 vs 4</td>
          <td> 2 vs 3</td>
          <td> 2 vs 8</td>
          <td> 7 vs 8</td>
          <td> 6 vs 7</td>
          <td> 5 vs 6</td>
        </tr>
        </tbody>
      
      </Table>
    </div>
  }
}

export default GroupOfSevenAndEight;