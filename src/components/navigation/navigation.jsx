import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './navigation.scss';
import Button from 'react-bootstrap/Button';



export class Navigation extends React.Component {
  render() {
    const { onSignOut, userData, user } = this.props;
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Film Spelunker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#link1" onClick={() => { onSignOut(null) }}><span>SignOut</span></Nav.Link>
              <Link to={`/users/${user}`}>
                <Button variant="dark">Profile</Button>

              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    )

  }


}