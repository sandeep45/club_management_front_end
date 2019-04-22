import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, Button, Col, Row} from 'react-bootstrap'
import playOrder from '../../constants/playOrder'
import _ from 'lodash';

class PlayScore extends Component {
  constructor(props) {
    super(props);
  };

  static defaultProps = {
    members: [],
    tableNumber: 0,
    columns: 3,
    displayPlayerNamesInScoreTables: false
  };

  static propTypes = {
    members: PropTypes.array.isRequired,
    tableNumber: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    displayPlayerNamesInScoreTables: PropTypes.bool.isRequired
  };

  _columnClass = () => {
    let str = '';
    const {columns} = this.props;
    switch(columns){
      case 0:
        str = `no-print`;
        break;
      case 1:
        str = `col-lg-12 col-md-12 col-sm-12`;
        break;
      case 2:
        str = `col-lg-6 col-md-6 col-sm-6`;
        break;
      case 3:
        str = `col-lg-4 col-md-4 col-sm-4`;
        break;
      case 4:
        str = `col-lg-3 col-md-3 col-sm-3`;
        break;
      case 6:
        str = `col-lg-2 col-md-2 col-sm-2`;
        break;
      default:
        str = `no-print`;
        break;
    }
    return str;
  }
  render() {
    const {members, tableNumber, columns,
      displayPlayerNamesInScoreTables} = this.props;
    let myMembers = members.filter(m => m.table_number === tableNumber).sort((a,b) => b.league_rating - a.league_rating);
    let numberOfPlayers = myMembers.length;
    let matches = playOrder[numberOfPlayers] || [];
    let matchChunks = _.chunk(matches, columns);
    return (
      <div className={`container-responsive hidden printable page-break`}>
        <h4>
          Score Card for Table # {tableNumber}
        </h4>
        {matchChunks.map( (matchChunk) => {
          return (
            <div className='row'>
              {matchChunk.map( match => {
                return (
                  <div className={this._columnClass()}>
                    <Table striped bordered hover responsive>
                      <thead>
                      <tr>
                        <th></th>
                        {/*<th className='small-player-name'>{myMembers[match[0]-1].name}</th>*/}
                        {/*<th className='small-player-name'>{myMembers[match[1]-1].name}</th>*/}
                        <th className='small-player-name'>
                          {this._playerIdentification(match[0], myMembers)}
                        </th>
                        <th className='small-player-name'>
                          {this._playerIdentification(match[1], myMembers)}
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      {[1,2,3,4,5].map(i => {
                        return (
                          <tr>
                            <td>#{i}</td>
                            <td> </td>
                            <td> </td>
                          </tr>
                        );
                      })}
                      </tbody>
                    </Table>
                  </div>
                );
              })}
            </div>
          );
        })}
        <hr />
      </div>
    );
  };
  
  _playerIdentification(index, myMembers) {
    const {displayPlayerNamesInScoreTables} = this.props;
    if(displayPlayerNamesInScoreTables == true){
      return myMembers[index-1].name ;
    }else{
      return index;
    }
  }
};

export default PlayScore