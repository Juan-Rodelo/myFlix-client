import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import axios from 'axios';
import config from '../../config';
import './movie-card.scss';


export class MovieCard extends React.Component {



  favFilm() {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    const refreshPage = () => {
      window.location.reload();
    }
    const { movie, userData } = this.props
    // console.log(movie, userData, token)
    if (userData && userData.FavoriteMovies.includes(movie._id)) {
      console.log('Deleting');
      axios.delete(`${config.API_URL}/users/${user}/movies/${movie._id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          this.props.onGetUser();
          refreshPage();
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
          // const data = response.data;
          console.log(data)
          refreshPage();
          // this.props.onGetUser();
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
      <Card className="card-space">
        <Link to={`/movies/${movie._id}`}>
          <Card.Img className="cardImage" variant="top" src={movie.ImagePath} />
        </Link>
        <Card.Body>
          <Card.Title className="card-title" >{movie.Title}</Card.Title>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Card.Title>{movie.Director.Name}</Card.Title>
          </Link>
          <Card.Text className="card-text">{movie.Description.slice(0, 140)}</Card.Text>
          {/* <div className="movie-card" onClick={() => { onMovieClick(movie) }}></div> */}
          <Link to={`/genre/${movie.Genre.Name}`}>
            <Card.Text className="card-genre">{movie.Genre.Name}</Card.Text>
          </Link>
          {/* <Button variant="primary" onClick={() => { this.favFilm(movie, userData, user, token); }}>Fav Film</Button> */}
          <div variant="primary" className="heart" onClick={() => { this.favFilm(movie, userData, user, token); }}>
            <svg width="72px" height="72px" viewBox="0 0 72 72" id="emoji" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g id="color">
                <g id="_600YlC">
                  <g>
                    <path fill="#EA5A47" d="M38.4637,14.703l0.4123,3.1273l0.4026,0.0536l1.3674-2.5648l2.1561,0.7613 c-0.14,1.558-1.74,4.2311,1.07,5.2588c-1.8372,0.6183-2.8115,1.2422-4.6323-0.0152c-1.0481-0.7238-2.6272,0.0793-3.2418,0.34 c-0.7542,0.3194-1.6364,0.6586-1.4836,1.9346c0.0415,0.3472,0.3816,0.6836-0.4217,1.7189 c-1.5952,1.7894-2.73,1.6071-4.7259,5.196c-2.4475-3.2363-1.1789-9.924,2.9149-12.305l-0.49-1.9423l2.1061-0.9195l1.6493,2.594 l0.9318-3.2377H38.4637z" />
                    <path fill="#D22F27" d="M37.8998,51.32c1.7607-3.743,2.4726-7.8935,2.06-12.0093c-0.373-3.5982-0.1758-3.3065,0.2164-4.8872 c2.8469,2.2791,6.409,1.884,9.318,1.1694c0.8322,1.3276,1.0998,2.9324,0.7434,4.4582 c-0.8779,5.4941-3.4286,10.5839-7.3045,14.5756c-3.2158,3.3068-6.4358,3.6325-10.0807,0.84 c-5.1314-3.9312-9.4576-8.54-11.1637-15.0556c-0.9274-3.5419,1.941-9.1041,5.3541-10.403 c0.804-0.3333,1.7304-0.1321,2.3237,0.5047c1.8217,1.7297,3.2064,3.8673,4.04,6.237c0.63,1.5616,1.1643,3.162,1.7837,4.8607 c-2.9374-8.3031-4.2141-9.7578-5.8242-11.0977c1.0163-2.4606,3.844-4.3388,4.7259-5.196 c0.3453-0.3726,0.5242-0.8698,0.4954-1.377c-0.3277-0.8162,0.0684-1.7435,0.8846-2.0711 c0.0632-0.0254,0.128-0.0467,0.1939-0.0638c1.3584-0.5673,2.6541-1.3366,4.1841-0.076c0.7944,0.3875,1.7136,0.4293,2.54,0.1157 c2.1936-0.7009,4.3193-1.6147,6.1987-2.3393l2.5141,5.0831c-1.536,1.0656-3.4246,2.2905-5.215,3.6452 c-1.4022,1.0325-2.7197,2.1752-3.94,3.4173c-1.8063,1.8081-2.5944,4.3964-2.1024,6.9043c0.687,4.1278,0.0845,8.367-1.7253,12.14 C38.0289,50.8957,37.9726,51.1116,37.8998,51.32z" />
                    <path fill="#EA5A47" d="M29.3665,30.5131c-2.992-2.5794-6.4657,3.0321-7.4105,5.7544c-0.9813-1.6903-1.2951-3.6863-0.88-5.5962 c1.0887-3.9847,2.2593-7.947,3.3529-11.7657h6.8686c-0.6591,0.5705-1.2245,1.2409-1.6755,1.9869 c-1.4543,2.3994-1.8507,5.2937-1.0953,7.9958C28.7411,29.4613,29.023,30.0068,29.3665,30.5131z" />
                    <path fill="#EA5A47" d="M45.8883,28.2339c1.4569,1.4613,2.284,3.4348,2.3043,5.4982c0.0014,0.4065,0.1122,2.1329-0.2474,2.1884 c-1.8919,0.3935-3.8538,0.285-5.6907-0.3148c-2.3888-0.8793-2.0959-1.7839-1.0364-3.09 C42.5993,30.9081,44.1671,29.4707,45.8883,28.2339z" />
                  </g>
                </g>
              </g>
              <g id="line">
                <g id="_600YlC-2">
                  <g>
                    <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M38.4637,14.703 l0.4123,3.1273l0.4026,0.0536l1.3674-2.5648l2.1561,0.7613c-0.14,1.558-1.74,4.2311,1.07,5.2588 c-1.8372,0.6183-2.8115,1.2422-4.6323-0.0152c-1.0481-0.7238-2.6272,0.0793-3.2418,0.34 c-0.7542,0.3194-1.6364,0.6586-1.4836,1.9346c0.0415,0.3472,0.3816,0.6836-0.4217,1.7189 c-1.5952,1.7894-2.73,1.6071-4.7259,5.196c-2.4475-3.2363-1.1789-9.924,2.9149-12.305l-0.49-1.9423l2.1061-0.9195l1.6493,2.594 l0.9318-3.2377H38.4637z" />
                    <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M37.8998,51.32 c1.7607-3.743,2.4726-7.8935,2.06-12.0093c-0.373-3.5982-0.1758-3.3065,0.2164-4.8872c2.8469,2.2791,6.409,1.884,9.318,1.1694 c0.8322,1.3276,1.0998,2.9324,0.7434,4.4582c-0.8779,5.4941-3.4286,10.5839-7.3045,14.5756 c-3.2158,3.3068-6.4358,3.6325-10.0807,0.84c-5.1314-3.9312-9.4576-8.54-11.1637-15.0556 c-0.9274-3.5419,1.941-9.1041,5.3541-10.403c0.804-0.3333,1.7304-0.1321,2.3237,0.5047c1.8217,1.7297,3.2064,3.8673,4.04,6.237 c0.63,1.5616,1.1643,3.162,1.7837,4.8607c-2.9374-8.3031-4.2141-9.7578-5.8242-11.0977c1.0163-2.4606,3.844-4.3388,4.7259-5.196 c0.3453-0.3726,0.5242-0.8698,0.4954-1.377c-0.3277-0.8162,0.0684-1.7435,0.8846-2.0711 c0.0632-0.0254,0.128-0.0467,0.1939-0.0638c1.3584-0.5673,2.6541-1.3366,4.1841-0.076c0.7944,0.3875,1.7136,0.4293,2.54,0.1157 c2.1936-0.7009,4.3193-1.6147,6.1987-2.3393l2.5141,5.0831c-1.536,1.0656-3.4246,2.2905-5.215,3.6452 c-1.4022,1.0325-2.7197,2.1752-3.94,3.4173c-1.8063,1.8081-2.5944,4.3964-2.1024,6.9043c0.687,4.1278,0.0845,8.367-1.7253,12.14 C38.0289,50.8957,37.9726,51.1116,37.8998,51.32z" />
                    <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M29.3665,30.5131 c-2.992-2.5794-6.4657,3.0321-7.4105,5.7544c-0.9813-1.6903-1.2951-3.6863-0.88-5.5962 c1.0887-3.9847,2.2593-7.947,3.3529-11.7657h6.8686c-0.6591,0.5705-1.2245,1.2409-1.6755,1.9869 c-1.4543,2.3994-1.8507,5.2937-1.0953,7.9958C28.7411,29.4613,29.023,30.0068,29.3665,30.5131z" />
                    <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M45.8883,28.2339 c1.4569,1.4613,2.284,3.4348,2.3043,5.4982c0.0014,0.4065,0.1122,2.1329-0.2474,2.1884 c-1.8919,0.3935-3.8538,0.285-5.6907-0.3148c-2.3888-0.8793-2.0959-1.7839-1.0364-3.09 C42.5993,30.9081,44.1671,29.4707,45.8883,28.2339z" />
                  </g>
                </g>
              </g>
            </svg>
          </div>
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