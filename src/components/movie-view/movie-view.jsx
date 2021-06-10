import React from 'react';
import { Link } from "react-router-dom";
import config from '../../config';




export class MovieView extends React.Component {


  render() {
    const { movie, onBackClick, userData, user, token } = this.props;

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
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-genre">
          <span className="label">Genre: </span>
          <Link to={`/genre/${movie.Genre.Name}`}>
            <span className="value">{movie.Genre.Name}</span>
          </Link>
        </div>

        <button onClick={(e) => {
          console.log(e);
          e.preventDefault();
          onBackClick()
        }}>Back</button>

        <button onClick={() => {
          favFilm(movie, userData, user, token);
        }}>Favourite</button>



      </div >
    );
  }
}