import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';



// create the component using the react template and export it to make it available
class MainView extends React.Component {
  //method used to create the component. It holds the component before rendering. The place to initialize a state’s values.
  constructor() {
    //calls the constructor of the parent class. Need to call super if they are subclasses.
    super();
    this.state = {
      movies: [],
      //The UI is a function of its state that now is null.
      selectedMovie: null
      user: null
    }
  }

  componentDidMount() {
    axios.get('https://movies87.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  setSelectedMovie = newSelectedMovie => {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view"></div>;
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={this.setSelectedMovie} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }
}




export default MainView;