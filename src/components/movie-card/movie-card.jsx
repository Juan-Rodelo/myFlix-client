import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';



export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (

      <Card>
        <Card.Img className="cardImage" variant="top" src={movie.ImagePath} onClick={() => { onMovieClick(movie) }} />
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description.slice(0, 140)}</Card.Text>
        {/* <div className="movie-card" onClick={() => { onMovieClick(movie) }}></div> */}
      </Card>

    )
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};