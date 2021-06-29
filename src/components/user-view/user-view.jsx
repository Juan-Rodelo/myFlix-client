import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../config';
import { Link } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import { Grid } from 'react-bootstrap';
import './user-view.scss';






import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export function UserView(props) {

  const { user, token, userData, movie, getUser, favoriteMovies } = props;




  return (
    <>
      <Row className="main-view justify-content-md-center">
        <Col md={10}>
          <div className="user-view">
            <div className="centerProfile">
              <div className="user-title my-4">Hello {`${userData.Username}`}</div>
            </div>

            <div >
              <div className="user-view-info"> {`${userData.Email}`}</div>
            </div>

          </div>
        </Col>
      </Row>
    </>
  )

}




