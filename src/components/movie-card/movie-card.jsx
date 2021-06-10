import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import axios from 'axios';




export class MovieCard extends React.Component {
  render() {

    const { movie, onMovieClick, userData, user, token, onGetUser } = this.props;

    function favFilm(movie, userData, user, token) {
      if (userData.FavoriteMovies.includes(movie._id)) {
        console.log('Deleting');
        axios.delete(`${config.API_URL}/users/${user}/movies/${movie._id}`, { headers: { Authorization: `Bearer ${token}` } })
          .then(response => {
            onGetUser();
          })
          .catch(e => {
            console.log('There is an error');
            console.log(e);
          })
      }
      else {
        console.log(adding)
        axios.patch(`${config.API_URL}/users/${user}/movies/${movie._id}`, { headers: { Authorization: `Bearer ${token}` } })
          .then(response => {
            onGetUser();
          })
          .catch(e => {
            console.log('There is an error');
            console.log(e);
          })
      }
    }


    return (

      <Card>

        <Link to={`/movies/${movie._id}`}>
          <Card.Img className="cardImage" variant="top" src={movie.ImagePath} />
        </Link>
        <Card.Title>{movie.Title}</Card.Title>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Card.Title>{movie.Director.Name}</Card.Title>
        </Link>
        <Card.Text>{movie.Description.slice(0, 140)}</Card.Text>
        {/* <div className="movie-card" onClick={() => { onMovieClick(movie) }}></div> */}
        <Button variant="primary" onClick={() => { favFilm(movie, userData, user, token); }}>Fav Film</Button>

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