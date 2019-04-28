import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Table, Button, MenuItem, DropdownButton } from "react-bootstrap";
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
    goToPage: PropTypes.func.isRequired,
  };

  render() {
    const {clubs, removeClub, goToPage} = this.props;

    return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Keyword</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map(club => {
              return (
                <tr key={club.id}>
                  <td>{club.name ? Capitalize(club.name) : ''}</td>
                  <td>{club.keyword}</td>
                  <td>
  
                    <Button bsStyle="link" onClick={goToPage.bind(this, `/clubs/${club.id}/members`)}>
                      Members
                    </Button>
                    <Button bsStyle="link" onClick={goToPage.bind(this, `/clubs/${club.id}/tables_break_out`)}>
                      Table Break-Out
                    </Button>
                    <Button bsStyle="link" onClick={goToPage.bind(this, `/clubs/${club.id}/checkins/dashboard`)}>
                      Check-in's Dashboard
                    </Button>
                    <DropdownButton bsStyle={`link`} title={'More Options'} id={`dropdown-basic`}>
                      <MenuItem onSelect={goToPage.bind(this, `/clubs/${club.id}/edit`)}>
                        Edit Club
                      </MenuItem>
                      <MenuItem onSelect={goToPage.bind(this, `/clubs/${club.id}/checkins`)}>
                        Check-in's Reporting
                      </MenuItem>
                      <MenuItem onSelect={goToPage.bind(this, `/clubs/${club.id}/play_dates`)}>
                        Setup Play Dates
                      </MenuItem>
                    </DropdownButton>
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