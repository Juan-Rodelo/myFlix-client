import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import config from '../../config';




// create the component using the react template and export it to make it available
class MainView extends React.Component {
  //method used to create the component. It holds the component before rendering. The place to initialize a state’s values.
  constructor() {
    //calls the constructor of the parent class. Need to call super if they are subclasses.
    super();
    this.state = {
      movies: [],
      //The UI is a function of its state that now is null.
      selectedMovie: null,
      user: null,
      register: false
    }
  }

  componentDidMount() {
    // axios.get(`${config.API_URL}/movies`)
    //   .then(response => {
    //     this.setState({
    //       movies: response.data
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }

  }

  onLoggedIn(authData) {
    console.log(authData);
    //This updates the state with the logged in authData
    this.setState({
      user: authData.user.Username
    });
    //auth information is stored locally
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    //gets the movies from your API once the user is logged in.
    //this refers to the object itself, in this case, the MainView class.
    this.getMovies(authData.token);
  }

  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }


  getMovies(token) {
    axios.get(`${config.API_URL}/movies`, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setSelectedMovie = newSelectedMovie => {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }


  // onLoggedIn(user) {
  //   this.setState({
  //     user
  //   });
  // }

  onRegister(register) {
    this.setState({
      register
    });
  }

  onBackClick() {
    this.setState({
      selectedMovie: null
    });
  }

  toggleRegister = (e) => {
    e.preventDefault();
    this.setState({
      register: !this.state.register
    })
  }



  render() {
    const { movies, selectedMovie, register } = this.state;

    if (register) return <RegistrationView onRegister={register => this.onRegister(register)} toggleRegisterProperty={this.toggleRegister} />;

    if (movies.length === 0) return <div className="main-view"></div>;
    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are 
    *passed as a prop to the LoginView*/
    if (this.state.user === null) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} toggleRegister={this.toggleRegister} />;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          {selectedMovie
            ?
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={this.setSelectedMovie} />
            </Col>
            :
            movies.map(movie => (
              // <Navigation user={user} history={history} onSignOut={signState => { this.signOut(signState); }} />
              <Col md={3}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie); }} />
              </Col>
            ))
          }
        </Row>
      </Router>

    );
  }
}




export default MainView;