import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, FormGroup, HelpBlock, FormControl, ControlLabel, Button, Form, InputGroup, DropdownButton, MenuItem} from 'react-bootstrap'

class MemberLookup extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    searchFields: PropTypes.object.isRequired,
    updateSearchFields: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  render() {
    const {searchFields} = this.props;
    const {memberLookup} = searchFields;

    return (
      <div>
        <FormGroup controlId='nameBox'>
          <ControlLabel>Lookup</ControlLabel>
          <FormControl type='text' placeholder='type name or email here'
                       inputRef={c => this._lookupText = c} value={memberLookup}
                       autoComplete="off"
                       onChange={this.lookupTextChanged }/>
        </FormGroup>
      </div>
    );
  };

  lookupTextChanged = e => {
    const {updateSearchFields} = this.props;
    updateSearchFields({
      memberLookup: e.target.value
    });
  };

}

export default MemberLookup