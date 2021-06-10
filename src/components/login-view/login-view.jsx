import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../config';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    //prevents refresh/reload,
    e.preventDefault();
    axios.post(`${config.API_URL}/login`, {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        // When a user logs in, the props onLoggedIn(data) is passed to the LoginView 
        //and triggers the function onLoggedIn(authData) in the MainView
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };

  //old submit
  // const handleSubmit = (e) => {
  //   //prevents refresh/reload,
  //   e.preventDefault();
  //   console.log(username, password);
  //   props.onLoggedIn(username);
  // }

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Button type="submit" onClick={handleSubmit}>Submit</Button>
      <Button type="secondary" onClick={props.toggleRegister}>Register</Button>

    </Form>
  )


}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};

