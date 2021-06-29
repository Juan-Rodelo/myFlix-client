import React from 'react';
import './director-view.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import PropTypes from 'prop-types';

export class DirectorView extends React.Component {


  render() {

    const { directorData, onBackClick } = this.props;

    return (
      <Row className="justify-content-md-center">
        <Col md={4} sl={10}>
          <div className="director-view">
            <div className="director-view-name">
              <span>{directorData.Name}</span>
            </div>
            <div className="director-bio">
              <span>{directorData.Bio}</span>
            </div>
            <div className="director-bio">
              <span>Birth:{directorData.Birth}</span>
            </div>
            <div className="director-bio">
              <span>Death:{directorData.Death}</span>
            </div>
            <button className="director-button" onClick={(e) => {
              console.log(e);
              e.preventDefault();
              onBackClick()
            }}>Back</button>
          </div>
        </Col>
      </Row >
    );
  }

}