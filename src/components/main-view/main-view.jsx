import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';



// create the component using the react template and export it to make it available
class MainView extends React.Component {
  //method used to create the component. It holds the component before rendering. The place to initialize a state’s values.
  constructor() {
    //calls the constructor of the parent class. Need to call super if they are subclasses.
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Arrival', Description: 'Arrival is a 2016 American science fiction drama film directed by Denis Villeneuve and written by Eric Heisserer. ... The film follows a linguist enlisted by the United States Army to discover how to communicate with extraterrestrial aliens who have arrived on Earth, before tensions lead to war', ImagePath: 'https://s.studiobinder.com/wp-content/uploads/2010/03/Arrival-Video-Essay-How-to-Balance-Fear-and-Intrigue-WP.jpg' },
        { _id: 2, Title: '2001 a Space Odyssey', Description: 'After discovering a monolith on the lunar surface, the Discovery One and its revolutionary supercomputer set out to unravel its mysterious origin', ImagePath: 'https://www.heraldnet.com/wp-content/uploads/2018/06/12307525_web1_TSR-2001-edh-180614.jpg' },
        { _id: 3, Title: 'Stalker', Description: 'In an unnamed country at an unspecified time, there is a fiercely protected post-apocalyptic wasteland known as The Zone. An illegal guide (Aleksandr Kajdanovsky), whose mutant child suggests unspeakable horrors within The Zone, leads a writer (Anatoliy Solonitsyn) and a scientist (Nikolay Grinko) into the heart of the devastation in search of a mythical place known only as The Room. Anyone who enters The Room will supposedly have any of his earthly desires immediately fulfilled', ImagePath: 'https://miro.medium.com/max/2732/1*Ls0EtYDed-4kypPOufMhBA.jpeg' }
      ],
      //The UI is a function of its state that now is null.
      selectedMovie: null
    }
  }

  setSelectedMovie = newSelectedMovie => {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

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