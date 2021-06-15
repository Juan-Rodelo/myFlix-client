import React from 'react';
// import PropTypes from 'prop-types';

export class DirectorView extends React.Component {


  render() {

    const { directorData, onBackClick } = this.props;

    return (
      <div>
        <div>
          <span>{directorData.Name}</span>
        </div>
        <div>
          <span>{directorData.Bio}</span>
        </div>
        <div>
          <span>Birth:{directorData.Birth}</span>
        </div>
        <div>
          <span>Death:{directorData.Death}</span>
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