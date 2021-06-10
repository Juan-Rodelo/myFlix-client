import React from 'react';
// import PropTypes from 'prop-types';

export class DirectorView extends React.Component {


  render() {

    const { directorData, onBackClick } = this.props;

    return (
      <div>
        <div>
          <span>{directorData.Name}</span>
          {/* <span>Juan</span> */}
        </div>
        <div>
          <span>{directorData.Bio}</span>
          {/* <span>Juan</span> */}
        </div>
        <div>
          <span>{directorData.Birth}</span>
          {/* <span>Juan</span> */}
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