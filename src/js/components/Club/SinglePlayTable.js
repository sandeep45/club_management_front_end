import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Capitalize from 'capitalize'

class SinglePlayTable extends Component {
  constructor(props) {
    super(props);
  };

  static defaultProps = {
    members: [],
    tableNumber: 0,
  };

  static propTypes = {
    members: PropTypes.array.isRequired,
    tableNumber: PropTypes.number.isRequired
  };

  render() {
    const {members, tableNumber} = this.props;
    let myMembers = members.filter(m => m.table_number === tableNumber);

    return (
      <div className={`${tableNumber !== 0 ? 'printable': 'no-print'} page-break`}>
        <h4>
          Table # {tableNumber}
        </h4>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            {members.map( (currVal,idx,arr) => <th>{idx}</th>)}
            <th>Win/Loss</th>
          </tr>
          </thead>
          <tbody>
          {myMembers.map((member, index, arr) => {
            return (
              <tr key={member.id}>
                <td>{index}</td>
                <td>{member.name ? Capitalize(member.name) : ''} ({member.league_rating})</td>
                {members.map( (currVal,idx, arr) => <td>{index == idx ? "N/A" : " "}</td>)}
                <td> &nbsp; </td>
              </tr>
            );
          })}
          </tbody>
        </Table>
        <hr />
      </div>
    );
  };

};

export default SinglePlayTable