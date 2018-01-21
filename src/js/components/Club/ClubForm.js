import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Table, FormGroup, HelpBlock, FormControl, ControlLabel, Button, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'


class ClubForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      club: props.club
    }
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.club != this.props.club){
      this.setState({
        club: nextProps.club
      })
    }
  };

  static defaultProps = {
    club: {
      name: ''
    }
  };

  static propTypes = {
    clubId: PropTypes.number,
    club: PropTypes.object,
    formAction: PropTypes.func.isRequired,
    goToAfterAction: PropTypes.func.isRequired,
  };

  render() {
    const {club} = this.state;
    return (
      <div>
        <Form>
          <FormGroup controlId='nameBox'>
            <ControlLabel>Club Name</ControlLabel>
            <FormControl type='text' placeholder='a memorable name goes here'
                         inputRef={c => this._nameInput = c} value={club.name}
                         onChange={this._nameChanged}/>
          </FormGroup>
          <Button type="submit" onClick={this._submitClickHandler} bsStyle='primary'>
            Submit
          </Button>
        </Form>
      </div>
    );
  };

  _nameChanged = e => {
    const club = {...this.state.club, name: e.target.value};
    this.setState({club});
  };

  _submitClickHandler = evt => {
    evt.preventDefault();
    const {formAction, goToAfterAction} = this.props;
    console.log("on click of submit button: ");
    formAction({
      name: this._nameInput.value
    }).then(
      response => {
        console.log("form action has been fired. now moving to listing page");
        goToAfterAction();
      }
    )

  }

};

export default ClubForm