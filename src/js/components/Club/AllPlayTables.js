import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Form, Table, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Capitalize from 'capitalize'
import SinglePlayTable from "./SinglePlayTable";
import UnassignedMembers from "./UnassignedMembers";
import PlayOrder from "./PlayOrder";

class AllPlayTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfTables: 10,
      peoplePerTable: 5
    }
  };

  static defaultProps = {
    members: []
  };

  static propTypes = {
    members: PropTypes.array.isRequired,
    assignTablesStraightForClub: PropTypes.func.isRequired,
    updateMember: PropTypes.func.isRequired,
  };

  render() {
    const {members, updateMember} = this.props;
    const {numberOfTables, peoplePerTable} = this.state;

    return (
      <div>
        <Form className={'no-print'}>
          <FormGroup controlId='nameBox'>
            <ControlLabel>Number of Tables</ControlLabel>{'  '}
            <FormControl type='text' placeholder='10'
                         inputRef={c => this._numberOfTablesInput = c} value={numberOfTables}
                         onChange={this._numberOfTablesChanged }/>
          </FormGroup>{'  '}
          <FormGroup controlId='emailBox'>
            <ControlLabel>Number of People Per Table</ControlLabel>{'  '}
            <FormControl type='text' placeholder='5'
                         inputRef={c => this._peoplePerTableInput = c} value={peoplePerTable}
                         onChange={this._peoplePerTableChanged}/>
          </FormGroup>{'  '}
          <Button type="submit" onClick={this._assignTablesStraightForClub} bsStyle='primary'>
            Assign Tables Straight
          </Button>
        </Form>
        <UnassignedMembers members={members} updateMember={updateMember} numberOfTables={numberOfTables}/>
        {[...Array(numberOfTables)].map( (currVal, idx, arr) => {
          return (
            <div>
              <SinglePlayTable members={members} tableNumber={idx+1}
                               updateMember={updateMember} numberOfTables={numberOfTables} />
              <PlayOrder members={members} tableNumber={idx+1} />
            </div>
          );
        })}

      </div>
    );
  };

  _peoplePerTableChanged = (e) => {
    this.setState({
      peoplePerTable: parseInt(e.target.value) || 0
    })
  };

  _numberOfTablesChanged = (e) => {
    this.setState({
      numberOfTables: parseInt(e.target.value) || 0
    })
  };

  _assignTablesStraightForClub = (e) => {
    const {assignTablesStraightForClub} = this.props;
    const {numberOfTables, peoplePerTable} = this.state;
    assignTablesStraightForClub(numberOfTables, peoplePerTable);
  }

};

export default AllPlayTables