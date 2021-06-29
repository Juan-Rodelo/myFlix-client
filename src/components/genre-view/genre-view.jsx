import React from 'react';
import './genre-view.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import PropTypes from 'prop-types';

export class GenreView extends React.Component {


  render() {

    const { genreData, onBackClick } = this.props;

    return (
      <Row className="justify-content-md-center">
        <Col md={4} sl={10}>
          <div className="genre-view">
            <div className="genre-view-name">
              <span>{genreData.Name}</span>
            </div>
            <div className="genre-description">
              <span>{genreData.Description}</span>
            </div>
            <button className="genre-button" onClick={(e) => {
              console.log(e);
              e.preventDefault();
              onBackClick()
            }}>Back</button>
          </div>
        </Col>
      </Row>
    );
  }

}