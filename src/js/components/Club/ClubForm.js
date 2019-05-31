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
      name: '',
      keyword: '',
      simply_compete_username: '',
      simply_compete_password: '',
      simply_compete_league_id: '',
      default_amount_to_collect: '',
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
        <Form autoComplete="off">
          <FormGroup controlId='nameBox'>
            <ControlLabel>Club Name</ControlLabel>
            <FormControl type='text' placeholder='a memorable name goes here'
                         inputRef={c => this._nameInput = c} value={club.name}
                         onChange={this._nameChanged}/>
          </FormGroup>
          <FormGroup controlId='keywordBox'>
            <ControlLabel>Keyword Name</ControlLabel>
            <FormControl type='text' placeholder='an easy name for texting goes here'
                         inputRef={c => this._keywordInput = c} value={club.keyword}
                         onChange={this._keywordChanged}/>
          </FormGroup>
          <FormGroup controlId='defaultAmountToCollectBox'>
            <ControlLabel>Default Amount to Collect</ControlLabel>
            <FormControl type='text' placeholder='what is the default payment amount'
                         inputRef={c => this._defaultAmountToCollectInput = c} value={club.default_amount_to_collect}
                         onChange={this._defaultAmountToCollectChanged} />
          </FormGroup>
          <FormGroup controlId='simplyCompeteUsernameBox'>
            <ControlLabel>SimplyCompete Username</ControlLabel>
            <FormControl type='email' placeholder='username to your SimplyCompete Account'
                         autoComplete="new-password"
                         inputRef={c => this._simplyCompeteUsernameInput = c} value={club.simply_compete_username}
                         onChange={this._simplyCompeteUsernameChanged}/>
          </FormGroup>
          <FormGroup controlId='simplyCompetePasswordBox'>
            <ControlLabel>SimplyCompete Password</ControlLabel>
            <FormControl type='password' placeholder='password to your SimplyCompete Account'
                         autoComplete="new-password"
                         inputRef={c => this._simplyCompetePasswordInput = c} value={club.simply_compete_password}
                         onChange={this._simplyCompetePasswordChanged}/>
          </FormGroup>
          <FormGroup controlId='simplyCompeteLeagueIdBox'>
            <ControlLabel>SimplyCompete League Id</ControlLabel>
            <FormControl type='text' placeholder='league id to your SimplyCompete Account'
                         inputRef={c => this._simplyCompeteLeagueIdInput = c} value={club.simply_compete_league_id}
                         onChange={this._simplyCompeteLeagueIdChanged}/>
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

  _keywordChanged = e => {
    const club = {...this.state.club, keyword: e.target.value};
    this.setState({club});
  };

  _defaultAmountToCollectChanged = e => {
    const club = {...this.state.club, default_amount_to_collect: e.target.value};
    this.setState({club});
  };

  _simplyCompeteUsernameChanged = e => {
    const club = {...this.state.club, simply_compete_username: e.target.value};
    this.setState({club});
  };

  _simplyCompetePasswordChanged = e => {
    const club = {...this.state.club, simply_compete_password: e.target.value};
    this.setState({club});
  };
  
  _simplyCompeteLeagueIdChanged = e => {
    const club = {...this.state.club, simply_compete_league_id: e.target.value};
    this.setState({club});
  };

  _submitClickHandler = evt => {
    evt.preventDefault();
    const {formAction, goToAfterAction} = this.props;
    console.log("on click of submit button: ");
    formAction({
      name: this._nameInput.value,
      keyword: this._keywordInput.value,
      simply_compete_username: this._simplyCompeteUsernameInput.value,
      simply_compete_password: this._simplyCompetePasswordInput.value,
      simply_compete_league_id: this._simplyCompeteLeagueIdInput.value,
      default_amount_to_collect: this._defaultAmountToCollectInput.value
    }).then(
      response => {
        console.log("form action has been fired. now moving to listing page");
        goToAfterAction();
      }
    )

  }

};

export default ClubForm