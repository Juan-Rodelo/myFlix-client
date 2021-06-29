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

import './profile-view.scss';





import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export function ProfileView(props) {

  const { user, token, userData, movie, getUser, favoriteMovies } = props;



  const refreshPage = () => {
    window.location.reload();
  }

  const deleteFilm = (movie, userData, user, token, getUser) => {
    // e.preventDefault();
    console.log('Deleting');
    axios.delete(`${config.API_URL}/users/${user}/movies/${movie._id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        // this.props.user();
        refreshPage();

      })
      .catch(e => {
        console.log('There is an error');
        console.log(e);
      })

  }



  return (
    <>


      {
        favoriteMovies.map((movie, i) => {
          return (
            <Col md={4} lg={3} sl={10}>
              <Card key={i} className="profile-card">
                <Link to={`/movies/${movie._id}`}>
                  <Card.Img className="cardImage" variant="top" src={movie.ImagePath} />
                </Link>
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <Card.Title>{movie.Director.Name}</Card.Title>
                  </Link>
                  <Card.Text className="card-text">{movie.Description.slice(0, 140)}</Card.Text>
                  {/* <div className="movie-card" onClick={() => { onMovieClick(movie) }}></div> */}
                  <Button variant="primary" onClick={() => { deleteFilm(movie, userData, user, token); }} >Delete Fav</Button>
                </Card.Body>
              </Card >
            </Col>

          )
        })
      }




    </>
  )
}