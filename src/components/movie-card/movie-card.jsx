import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import axios from 'axios';
import config from '../../config';





export class MovieCard extends React.Component {

  favFilm(movie, userData, user, token) {
    console.log(movie, userData, token)
    if (userData.FavoriteMovies.includes(movie._id)) {
      console.log('Deleting');
      axios.delete(`${config.API_URL}/users/${user}/movies/${movie._id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          this.props.onGetUser();
        })
        .catch(e => {
          console.log('There is an error');
          console.log(e);
        })
    }
    else {
      console.log('adding', token)
      axios.post(`${config.API_URL}/users/${user}/movies/${movie._id}`, {}, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          const data = response.data;
          console.log(data)
          this.props.onGetUser();
        })
        .catch(e => {
          console.log('There is an error');
          console.log(e);
        })
    }
  }

  render() {

    const { movie, onMovieClick, userData, user, token, onGetUser } = this.props;

    return (

      <Card>

        <Link to={`/movies/${movie._id}`}>
          <Card.Img className="cardImage" variant="top" src={movie.ImagePath} />
        </Link>
        <Card.Body>

          <Card.Title>{movie.Title}</Card.Title>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Card.Title>{movie.Director.Name}</Card.Title>
          </Link>
          <Card.Text>{movie.Description.slice(0, 140)}</Card.Text>
          {/* <div className="movie-card" onClick={() => { onMovieClick(movie) }}></div> */}
          <Link to={`/genre/${movie.Genre.Name}`}>
            <Card.Text>{movie.Genre.Name}</Card.Text>
          </Link>

          <Button variant="primary" onClick={() => { this.favFilm(movie, userData, user, token); }}>Fav Film</Button>
        </Card.Body>

      </Card >

    )
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};