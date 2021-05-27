import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function LoginView(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    //prevents refresh/reload,
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  }


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
