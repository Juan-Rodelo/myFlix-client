import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../config';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export function ProfileView(props) {

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

  const deleteFilm = (movie, userData, user, token) => {
    e.preventDefault();
    console.log('Deleting');
    axios.delete(`${config.API_URL}/users/${user}/movies/${movie._id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        this.props.getUser();
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
  if (!userData) {
    this.getUser()
    return (
      <div>Loading</div>
    )
  }
  return (
    <>
      <div>
        <div className="centerProfile">
          <h1 className="title my-4">Hello {`${userData.Username}`},</h1>
        </div>
        <div className="align-text-left">
          <div className=" my-2"><strong>Username:</strong> {`${userData.Username}`}</div>
          <div className=" my-2"><strong>Email:</strong> {`${userData.Email}`}</div>
        </div>
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </div>

      {
        favoriteMovies.map((movie, i) => {
          return (
            <Row>
              <Col md={4}>
                <Card key={i}>
                  <Link to={`/movies/${movie._id}`}>
                    <Card.Img className="cardImage" variant="top" src={movie.ImagePath} />
                  </Link>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <Card.Title>{movie.Director.Name}</Card.Title>
                  </Link>
                  <Card.Text>{movie.Description.slice(0, 140)}</Card.Text>
                  {/* <div className="movie-card" onClick={() => { onMovieClick(movie) }}></div> */}
                  <Button variant="primary" onClick={() => { this.deleteFilm(movie, userData, user, token); }}>Delete Fav</Button>

                </Card >
              </Col>
            </Row>

          )
        })
      }



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
    </>
  )
}