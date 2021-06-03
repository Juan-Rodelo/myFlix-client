import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../config';

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
    <form>
      <label>
        Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <span>
        <button type="submit" onClick={handleSubmit}>Submit</button>
        <button type="secondary" onClick={props.toggleRegister}>Register</button>
      </span>
    </form>
  )


}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};

