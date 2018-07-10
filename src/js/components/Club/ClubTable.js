import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Capitalize from 'capitalize'

class ClubTable extends Component {
  constructor(props) {
    super(props)
  };

  static defaultProps = {
    clubs: []
  };

  static propTypes = {
    clubs: PropTypes.array.isRequired,
    removeClub: PropTypes.func.isRequired,
  };

  render() {
    const {clubs, removeClub} = this.props;

    return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map(club => {
              return (
                <tr key={club.id}>
                  <td>{club.name ? Capitalize(club.name) : ''}</td>
                  <td>
                    <Link to={`/clubs/${club.id}/edit`}>Edit</Link>{" | "}
                    <Link to={`/clubs/${club.id}/members`}>Members</Link>{" | "}
                    <Link to={`/clubs/${club.id}/checkins`}>Checkins</Link>{" | "}
                    <Link to={`/clubs/${club.id}/checkins/dashboard`}>Checkins Dashboard</Link>{" | "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
    );
  };
};

export default ClubTable