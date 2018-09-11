import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, Button} from 'react-bootstrap'
import playOrder from '../../constants/playOrder'

class PlayOrder extends Component {
  constructor(props) {
    super(props);
  };

  static defaultProps = {
    members: [],
    tableNumber: 0,
  };

  static propTypes = {
    members: PropTypes.array.isRequired,
    tableNumber: PropTypes.number.isRequired
  };

  render() {
    const {members, tableNumber} = this.props;
    let myMembers = members.filter(m => m.table_number === tableNumber);
    let numberOfPlayers = myMembers.length;
    let matches = playOrder[numberOfPlayers] || [];
    console.log(numberOfPlayers);
    console.log(playOrder);
    return (
      <div className={`printable hidden`}>
        <ul className={'list-inline'}>
        {matches.map( (match) => {
          return (
            <li>&bull; #{match[0]} vs. #{match[1]}</li>
          );
        })}
        </ul>
      </div>
    );
  };

};

export default PlayOrder