import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Capitalize from 'capitalize'
import SinglePlayTable from "./SinglePlayTable";
import UnassignedMembers from "./UnassignedMembers";

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
  };

  render() {
    const {members} = this.props;
    const {numberOfTables, peoplePerTable} = this.state;

    return (
      <div>
        <form className={'no-print'}>
          <FormGroup controlId='nameBox'>
            <ControlLabel>Number of Tables</ControlLabel>
            <FormControl type='text' placeholder='10'
                         inputRef={c => this._numberOfTablesInput = c} value={numberOfTables}
                         onChange={this._numberOfTablesChanged }/>
          </FormGroup>
          <FormGroup controlId='emailBox'>
            <ControlLabel>Number of People Per Table</ControlLabel>
            <FormControl type='text' placeholder='5'
                         inputRef={c => this._peoplePerTableInput = c} value={peoplePerTable}
                         onChange={this._peoplePerTableChanged}/>
          </FormGroup>
        </form>
        <UnassignedMembers members={members} />
        {[...Array(numberOfTables)].map( (currVal, idx, arr) => {
          return (
            <SinglePlayTable members={members} tableNumber={idx+1} />
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

};

export default AllPlayTables