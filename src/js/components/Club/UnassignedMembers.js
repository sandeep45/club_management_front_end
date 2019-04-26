import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, Button, FormControl, InputGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Capitalize from 'capitalize'
import SinglePlayTable from "./SinglePlayTable";
import MoveTable from "./MoveTable";

class UnassignedMembers extends Component {
  constructor(props) {
    super(props);
  };

  static defaultProps = {
    members: [],
  };

  static propTypes = {
    members: PropTypes.array.isRequired,
    updateMember: PropTypes.func.isRequired,
    numberOfTables: PropTypes.number.isRequired,
  };

  render() {
    const {members, numberOfTables, updateMember} = this.props;
    let myMembers = members.filter(m => (m.table_number === 0) || (m.table_number === undefined) || (m.table_number === "") || (m.table_number === null) || (m.table_number === " ") );

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
            <th>Move Table</th>
            <th>Player</th>
          </tr>
          </thead>
          <tbody>
          {myMembers.map((member, index, arr) => {
            return (
              <tr key={member.id}>
                <td>{index+1}</td>
                <td>
                  <MoveTable numberOfTables={numberOfTables} updateMember={updateMember} member={member} />
                </td>
                <td>{member.name ? Capitalize(member.name) : ''} ({member.league_rating})</td>
              </tr>
            );
          })}
          </tbody>
        </Table>
      </div>
    );
  };

  _tableNumberChanged = (memberId, e) => {
    const {updateMember} = this.props;
    let tableNumber = e.target.value;
    if(!tableNumber){
      tableNumber = 0;
    }
    updateMember(memberId, {table_number: tableNumber})
  }
};

export default UnassignedMembers