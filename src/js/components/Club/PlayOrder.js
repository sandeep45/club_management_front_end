import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, Button, Col, Row} from 'react-bootstrap'
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
    let myMembers = members.filter(m => m.table_number === tableNumber).sort((a,b) => b.league_rating - a.league_rating);
    let numberOfPlayers = myMembers.length;
    let matches = playOrder[numberOfPlayers] || [];
    return (
      <div className={`printable page-break`}>
        <h4>
          Play Order for Table # {tableNumber}
        </h4>
        <ul className={''}>
        {matches.map( (match) => {
          return (
            <li>
              #{match[0]} <strong>vs.</strong> #{match[1]}{' '}
              - ( {myMembers[match[0]-1].name} <strong>vs.</strong> {myMembers[match[1]-1].name} )
            </li>
          );
        })}
        </ul>
        <hr />
      </div>
    );
  };

};

export default PlayOrder