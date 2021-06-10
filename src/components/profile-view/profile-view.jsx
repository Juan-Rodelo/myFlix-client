import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../config';


import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export function ProfileView(props) {

  const { user, token } = props;

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
      })
      .catch(e => {
        console.log('There is an error');
        console.log(e);
      })
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
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="Email" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="Date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      <Button type="submit" onClick={handleSubmit}>Submit</Button>
      <Button type="submit" onClick={deleteUser}>Delete User</Button>

    </Form>
  )
}