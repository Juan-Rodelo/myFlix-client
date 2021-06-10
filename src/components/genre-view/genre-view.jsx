import React from 'react';
// import PropTypes from 'prop-types';

export class GenreView extends React.Component {


  render() {

    const { genreData, onBackClick } = this.props;

    return (
      <div>
        <div>
          <span>{genreData.Name}</span>
        </div>
        <div>
          <span>{genreData.Description}</span>
        </div>
        <button onClick={(e) => {
          console.log(e);
          e.preventDefault();
          onBackClick()
        }}>Back</button>
      </div>
    );
  }

}