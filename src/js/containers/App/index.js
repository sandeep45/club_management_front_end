import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link, withRouter, Switch } from 'react-router-dom'
import * as actions from '../../action_creators';
import * as reducers from '../../reducers';
import SignIn from '../../containers/Authentication/SignIn'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import K from '../../constants/';
import AuthenticationContainer from "../Authentication/AuthenticationContainer.js";
import ClubContainer from "../Club/ClubContainer.js";
import NotFound from "../../components/Generic/NotFound";
import Home from "../Home/HomeContainer";


const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return { };
};

class App extends Component {
  constructor(props) {
    super(props)
  };

  componentWillMount(){
    console.log("App has mounted");
    this._init();
  };

  _init = () => {
    document.title = `App`;
  };

  render() {
    const {} = this.props;

    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/authentication" component={AuthenticationContainer} />
          <Route path="/clubs" component={ClubContainer} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  };
};

App = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));


export default App;