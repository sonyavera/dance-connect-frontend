import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import bgimage from './Malecon.jpg'
import '../App.css';

const JumboImage = (props) => {
  return (
    <div>
      <Jumbotron className="jumbotron-img" style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover',  }} fluid>
        <Container className="jumbotron-text" fluid>
          <h1 className="display-3">conexión danza</h1>
          <p className="lead">Connect with and learn from dance instructors around the world from your own home.</p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default JumboImage;