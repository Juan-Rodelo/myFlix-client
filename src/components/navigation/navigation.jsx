import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar } from 'react-bootstrap';

export class Navigation extends React.Component {
  render() {
    const { onSignOut } = this.props;
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Film Spelunker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#home" onClick={() => { onSignOut(null) }}><span>SignOut</span></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    )

  }


}