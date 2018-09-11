import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {FormControl} from 'react-bootstrap'

class MoveTable extends Component {
  constructor(props) {
    super(props)
  };

  static defaultProps = {
    clubs: []
  };

  static propTypes = {
    numberOfTables: PropTypes.number.isRequired,
    updateMember: PropTypes.func.isRequired,
    member: PropTypes.object.isRequired,
  };

  render() {
    const {numberOfTables, member} = this.props;

    return (
      <FormControl componentClass="select" placeholder="select table number"
                   onChange={this._tableNumberChanged.bind(this, member.id)}>
        {[...Array(numberOfTables)].map( (currVal, idx, arr) => {
          return (
            <option selected={member.table_number == idx+1} value={idx+1}>{idx+1}</option>
          );
        })}
      </FormControl>
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

export default MoveTable