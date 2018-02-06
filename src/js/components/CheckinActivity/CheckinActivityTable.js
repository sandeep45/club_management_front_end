import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, Button} from 'react-bootstrap'

class CheckinActivityTable extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    checkinActivity: PropTypes.array.isRequired,
  };

  static defaultProps = {
    checkinActivity: []
  };

  render() {
    const {checkinActivity} = this.props;
    return (
      <Table striped borderedhover>
        <thead>
          <tr>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {checkinActivity.map(ca => {
            return (
              <tr key={ca.uuid}>
                <td>{ca.message}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default CheckinActivityTable