import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Capitalize from 'capitalize'

class UnassignedMembers extends Component {
  constructor(props) {
    super(props);
  };

  static defaultProps = {
    members: [],
  };

  static propTypes = {
    members: PropTypes.array.isRequired,
  };

  render() {
    const {members} = this.props;
    let myMembers = members.filter(m => m.table_number === 0);

    return (
      <div className={'no-print'}>
        <hr/>
        <h4>
          Unassigned Members
        </h4>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
          </tr>
          </thead>
          <tbody>
          {myMembers.map((member, index, arr) => {
            return (
              <tr key={member.id}>
                <td>{index+1}</td>
                <td>{member.name ? Capitalize(member.name) : ''} ({member.league_rating})</td>
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

export default UnassignedMembers