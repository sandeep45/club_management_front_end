import React, {Component} from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import PropTypes from 'prop-types';

class SignedInBar extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {};

  static defaultProps = {
    email: PropTypes.string.isRequired,
    signOut: PropTypes.func.isRequired,
    goToPage: PropTypes.func.isRequired,
    clubId: PropTypes.number,
  };

  render() {
    const {email, signOut, goToPage, clubId} = this.props;
    console.log("props in signedInBar: ", this.props);
    return (
      <Navbar collapseOnSelect className={'no-print'}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="javascript:void(0)" onClick={goToPage.bind(this, "/clubs")}>Club Management</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem href="#" onClick={goToPage.bind(this, "/clubs")}>
              Clubs
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem href="#" onClick={signOut}>Sign Out</NavItem>
          </Nav>
          <Navbar.Text pullRight>
            Signed In as {email}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  };
}

export default SignedInBar