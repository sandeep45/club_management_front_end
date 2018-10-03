import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Form, Table, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Capitalize from 'capitalize'
import SinglePlayTable from "./SinglePlayTable";
import UnassignedMembers from "./UnassignedMembers";
import PlayOrder from "./PlayOrder";
import PlayScore from "./PlayScore";

class AllPlayTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfTables: 10,
      peoplePerTable: 5,
      columns: 3
    }
  };

  static defaultProps = {
    members: []
  };

  static propTypes = {
    members: PropTypes.array.isRequired,
    assignTablesStraightForClub: PropTypes.func.isRequired,
    assignTablesEveryOtherForClub: PropTypes.func.isRequired,
    assignTablesRandomForClub: PropTypes.func.isRequired,
    updateMember: PropTypes.func.isRequired,
  };

  render() {
    const {members, updateMember} = this.props;
    const {numberOfTables, peoplePerTable, columns} = this.state;

    return (
      <div>
        <Form className={'no-print'} onSubmit={e => e.preventDefault()}>
          <FormGroup controlId='nameBox'>
            <ControlLabel>Number of Tables</ControlLabel>{'  '}
            <FormControl type='text' placeholder='10'
                         inputRef={c => this._numberOfTablesInput = c} value={numberOfTables}
                         onChange={this._numberOfTablesChanged }/>
          </FormGroup>{'  '}
          <FormGroup controlId='emailBox'>
            <ControlLabel>Number of People Per Table</ControlLabel>{'  '}
            <select value={peoplePerTable} onChange={this._peoplePerTableChanged}
                    ref={c => this._peoplePerTableInput= c}
                    style={{marginLeft: 10}}
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </FormGroup>{'  '}
          <FormGroup controlId='columnsBox'>
            <ControlLabel># of Score Tables to Print Per Row</ControlLabel>{'  '}
            <select value={columns} onChange={this._columnsChanged}
                    ref={c => this._columnsInput= c}
                    style={{marginLeft: 10}}
            >
              <option value="0">off</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </FormGroup>{'  '}
          <Button type="submit" onClick={this._assignTablesStraightForClub} bsStyle='primary'>
            Assign Tables Straight
          </Button>{" "}
          <Button type="submit" onClick={this._assignTablesEveryOtherForClub} bsStyle='primary'>
              Assign Tables Every Other
          </Button>
          {" "}
          <Button type="submit" onClick={this._assignTablesRandomForClub} bsStyle='primary'>
              Assign Tables Random
          </Button>
        </Form>
        <UnassignedMembers members={members} updateMember={updateMember} numberOfTables={numberOfTables}/>
        {[...Array(numberOfTables)].map( (currVal, idx, arr) => {
          return (
            <div>
              <SinglePlayTable members={members} tableNumber={idx+1}
                               updateMember={updateMember} numberOfTables={numberOfTables} />
              <PlayOrder members={members} tableNumber={idx+1} />
              <PlayScore members={members} tableNumber={idx+1} columns={columns} />
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

  _columnsChanged = (e) => {
    this.setState({
      columns: parseInt(e.target.value) || 0
    })
  };

  _assignTablesStraightForClub = (e) => {
    const {assignTablesStraightForClub} = this.props;
    const {numberOfTables, peoplePerTable} = this.state;
    assignTablesStraightForClub(numberOfTables, peoplePerTable);
  };

  _assignTablesEveryOtherForClub = (e) => {
    const {assignTablesEveryOtherForClub} = this.props;
    const {numberOfTables, peoplePerTable} = this.state;
    assignTablesEveryOtherForClub(numberOfTables, peoplePerTable);
  }

  _assignTablesRandomForClub = (e) => {
    const {assignTablesRandomForClub} = this.props;
    const {numberOfTables, peoplePerTable} = this.state;
    assignTablesRandomForClub(numberOfTables, peoplePerTable);
  }

};

export default AllPlayTables