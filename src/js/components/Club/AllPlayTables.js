import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Capitalize from 'capitalize'
import SinglePlayTable from "./SinglePlayTable";

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
        <form>
          <FormGroup controlId='nameBox'>
            <ControlLabel>Number of Tables</ControlLabel>
            <FormControl type='text' placeholder='10'
                         inputRef={c => this._numberOfTablesInput = c} value={numberOfTables}
                         onChange={this._numberOfTablesChanged }/>
          </FormGroup>
          <FormGroup controlId='emailBox'>
            <ControlLabel>Email</ControlLabel>
            <FormControl type='text' placeholder='5'
                         inputRef={c => this._peoplePerTableInput = c} value={peoplePerTable}
                         onChange={this._peoplePerTableChanged}/>
          </FormGroup>
        </form>
        <SinglePlayTable members={members} />
        <hr />
        <SinglePlayTable members={members} />
        <hr />
        <SinglePlayTable members={members} />
        <hr />
      </div>
    );
  };

  _peoplePerTableChanged = (e) => {
    this.setState({
      peoplePerTable: e.target.value
    })
  };

  _numberOfTablesChanged = (e) => {
    this.setState({
      numberOfTables: e.target.value
    })
  };

};

export default AllPlayTables