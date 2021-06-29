import React from 'react';
import { Link } from "react-router-dom";
import config from '../../config';
import './movie-view.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




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
      <>
        <Row className="justify-content-md-center">
          <Col md={4} sl={10}>
            <div className="movie-view">
              <div className="movie-view-poster">
                <img src={movie.ImagePath} />
              </div>
              <div className="movie-title">
                <span className="value">{movie.Title}</span>
              </div>
              <div className="movie-description">
                <span className="value">{movie.Description}</span>
              </div>
              <div className="movie-genre">
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
          </Col>
        </Row>
      </>
    );
  }
}