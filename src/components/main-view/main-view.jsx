import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';


import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { Navigation } from '../navigation/navigation';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { UserView } from '../user-view/user-view';
import { UserChange } from '../userchange-view/userchange-view';






import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


import config from '../../config';




// create the component using the react template and export it to make it available
class MainView extends React.Component {
  //method used to create the component. It holds the component before rendering. The place to initialize a state’s values.
  constructor() {
    //calls the constructor of the parent class. Need to call super if they are subclasses.
    super();
    this.state = {
      // movies: [],
      user: null,
      userData: null,
      // register: null
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
    let userToken = localStorage.getItem('user');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        token: localStorage.getItem('token')

      });
      this.getMovies(accessToken);
      this.getUser(accessToken, userToken);
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

  signOut(outState) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: outState
    });
  }

  // newUser(newData) {
  //   localStorage.setItem('user', newData.Username);
  //   this.setState({
  //     userData: newData,
  //     user: newData.Username
  //   });
  // }


  getMovies(token) {
    axios.get(`${config.API_URL}/movies`, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        // this.setState({
        //   movies: response.data
        // });
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUser(token, user) {
    axios.get(`${config.API_URL}/users/${user}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        this.setState({
          userData: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // setSelectedMovie = newSelectedMovie => {
  //   this.setState({
  //     selectedMovie: newSelectedMovie
  //   });
  // }


  // onLoggedIn(user) {
  //   this.setState({
  //     user
  //   });
  // }

  // onRegister(register) {
  //   this.setState({
  //     register
  //   });
  // }

  // onBackClick() {
  //   this.setState({
  //     selectedMovie: null
  //   });
  // }

  toggleRegister = (e) => {
    e.preventDefault();
    this.setState({
      register: !this.state.register
    })
  }



  render() {
    const { user, token, userData } = this.state;
    const { movies } = this.props;
    console.log(userData);



    // if (movies.length === 0) return <div className="main-view"></div>;
    // /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are 
    // *passed as a prop to the LoginView*/
    // if (this.state.user === null) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} toggleRegister={this.toggleRegister} />;

    return (

      <Router>
        {/* <Row className="main-view justify-content-md-center"> */}

        <Route exact path="/" render={() => {
          if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
          if (movies.length === 0) return <div className="main-view">movies are loading. . . </div>
          return (
            <>
              <Navigation userData={userData} user={user} onSignOut={outState => { this.signOut(outState); }} />
              <Row className="main-view justify-content-md-center">
                {/* <Col md={3}> */}

                <MoviesList movies={movies} userData={userData} user={user} token={token} onGetUser={() => { this.getUser(token, user); }} />
                {/* {movies.map(m => (
                  <Col md={3} key={m._id}>
                    <MovieCard movie={m} userData={userData} user={user} token={token} onGetUser={() => { this.getUser(token, user); }} /> */}
                {/* </Col> */}
              </Row>

              {/* ))} */}
            </>
          )
        }} />



        <Route path="/register" render={() => {
          if (user) return <Redirect to="/" />
          return <Col>
            <RegistrationView />
          </Col>
        }} />


        {/* <Route path="/movies/:title" render={({ match }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m.Title === match.params.title)} onBackClick={() => history.goBack()} />
            </Col>
          }} /> */}
        {/* are {match, history}  objects of render that are set in this method? */}
        <Route path="/movies/:movieId" render={({ match, history }) => {
          if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
          if (movies.length === 0) return <div className="main-view" />;
          return <Col>
            <MovieView user={user} token={token} userData={userData} movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
          </Col>
        }} />

        <Route path="/directors/:name" render={({ match, history }) => {
          if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
          if (movies.length === 0) return <div className="main-view" />;
          return <Col>
            <DirectorView directorData={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />

          </Col>
        }} />

        <Route path="/genre/:name" render={({ match, history }) => {
          if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
          if (movies.length === 0) return <div className="main-view" />;
          return <Col>
            <GenreView genreData={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />

          </Col>
        }} />

        <Route path={`/users/${user}`} render={({ match, history }) => {
          if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
          if (movies.length === 0) return <div className="main-view" />;
          if (!userData) return <div>Loading</div>
          return (
            <>
              <Navigation userData={userData} user={user} onSignOut={outState => { this.signOut(outState); }} />
              <Row className="main-view justify-content-md-center"><Col><UserView user={user} favoriteMovies={movies.filter(m => userData.FavoriteMovies.includes(m._id))} token={token} history={history} getUser={() => this.getUser(user, token)} userData={userData} onNewUser={newData => { this.newUser(newData); }} onSignOut={signState => { this.signOut(signState); }} />
              </Col></Row>

              <Row className="main-view justify-content-md-center">
                <ProfileView user={user} favoriteMovies={movies.filter(m => userData.FavoriteMovies.includes(m._id))} token={token} history={history} getUser={() => this.getUser(user, token)} userData={userData} onNewUser={newData => { this.newUser(newData); }} onSignOut={signState => { this.signOut(signState); }} />
              </Row>


              <Row><Col>
                <UserChange user={user} favoriteMovies={movies.filter(m => userData.FavoriteMovies.includes(m._id))} token={token} history={history} getUser={() => this.getUser(user, token)} userData={userData} onNewUser={newData => { this.newUser(newData); }} onSignOut={signState => { this.signOut(signState); }} />
              </Col>
              </Row>
            </>
          )


        }} />


        {/* <Route path="/directors/:name" render={({ match }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
            </Col>
          }
          } /> */}


        {/* </Row> */}

      </Router>



    );
  }


}

let mapStateToProps = state => {
  return { movies: state.movies }
}


export default connect(mapStateToProps, { setMovies })(MainView);