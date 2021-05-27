import React from 'react';

export class LoginView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
      e.preventDefault();
      console.log(username, password);



      render() {
        return (
          <form>
            <label>
              Username:
          <input type="text" value={username}
                setUsername={e.target.value} />
            </label>
            <label>
              Password:
          <input type="Password" value={password}
                setPassword={e.target.value} />
              <button type="button" onClick={handleSubmit}>Submit</button>
            </label>
          </form>
        )
      }

    }
