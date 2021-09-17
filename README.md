Film Spelunker
myFlix app Client side.

Description
Internet movie database that allows registered users to browse movies by Title, Genre, Director. Users can change their username, email adress and birthday. While browsing the movies collection, users can add movies to their list of favorites.

Using:
Property	Tool
Language	JavaScript
Library	React
Route handling	axios
Styling Framework	Bootstrap
State management	Redux
API	REST
bundler	parcel
Dependencies
axios
bootstrap
node-sass
parcel-bundler
prop-types
react-dom
react-router-dom
babel

Application functions
Film Spelunker Application shows a list of movies which can be viewed by registered users. User data is  stored in a collection and API calls are made.



App structure

    App
    |_  main-view
        |_  navbar
        |   |_  profile-view
        |
        |_  movie-view
        |   |_  movie-card
        |
        |_  login-view
        |   |_  registration-view
        |
        |_  genre-view
        |_  director-view

