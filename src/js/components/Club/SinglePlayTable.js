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
    members: []
  };

  static propTypes = {
    members: PropTypes.array.isRequired,
  };

  render() {
    const {members} = this.props;

    return (
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>Name</th>
          <th>Rating</th>
          <th>Table #</th>
        </tr>
        </thead>
        <tbody>
        {members.map(member => {
          return (
            <tr key={member.id}>
              <td>{member.name ? Capitalize(member.name) : ''}</td>
              <td>{member.league_rating}</td>
              <td>{member.table_number}</td>
            </tr>
          );
        })}
        </tbody>
      </Table>
    );
  };
};

export default SinglePlayTable