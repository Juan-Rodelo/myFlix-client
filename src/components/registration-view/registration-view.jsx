import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../config';


export function RegistrationView(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');


  const handleSubmit = (e) => {
    //prevents refresh/reload,
    e.preventDefault();
    axios.post(`${config.API_URL}/login`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday, birthday,
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        // the second argument '_self' is necessary so that the page will open in the current tab
        window.open('/', '_self');
        // When a user logs in, the props onRegister(data) is passed to the LoginView 
        //and triggers the function onRegister(authData) in the MainView
        // props.onRegister(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };


  return (
    <form>
      <label>
        Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
          <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Email:
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Birthday:
          <input type="text" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </label>
      <span>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </span>
    </form>
  )


}

// RegistrationView.propTypes = {
//   onRegister: PropTypes.func.isRequired
// };