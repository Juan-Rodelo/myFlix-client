import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';

export class Navigation extends React.Component {
  render() {
    const { signOut } = this.props;

    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Film Spelunker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link" onClick={() => { onSignOut(null) }}> LogOut </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>


  }


}