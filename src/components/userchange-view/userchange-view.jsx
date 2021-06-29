import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../config';
import { Link } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import { Grid } from 'react-bootstrap';

import './userchange-view.scss';





import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export function UserChange(props) {

  const { user, token, userData, movie, getUser, favoriteMovies } = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const deleteUser = (token, e) => {
    //prevents refresh/reload,
    e.preventDefault();
    axios.delete(`${config.API_URL}/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log(response);
        console.log(`${user} has been deleted`);
        // the second argument '_self' is necessary so that the page will open in the current tab
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('There is an error');
        console.log(e);
      })
  }

  const refreshPage = () => {
    window.location.reload();
  }



  const handleSubmit = (e) => {
    //prevents refresh/reload,
    e.preventDefault();
    axios.put(`${config.API_URL}/users/${user}`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        // the second argument '_self' is necessary so that the page will open in the current tab

        // When a user logs in, the props onRegister(data) is passed to the LoginView 
        //and triggers the function onRegister(authData) in the MainView
        // props.onRegister(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };
  if (!userData) {
    this.getUser()
    return (
      <div>Loading</div>
    )
  }
  return (
    <>



      <Row className="main-view justify-content-md-center">
        <Col md={4} sl={10}>
          <div className="userchange-view">Update User</div>
          <Form className="userchange-view-form">
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="Email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <div className="userchange-button">
              <Button type="submit" variant="dark" onClick={handleSubmit}>Submit</Button>
              <Button type="submit" variant="dark" onClick={deleteUser}>Delete User</Button>
            </div>

          </Form>
        </Col>
      </Row>


    </>
  )
}