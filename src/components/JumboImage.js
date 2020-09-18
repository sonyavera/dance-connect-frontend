import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import bgimage from './Malecon.jpg'
import '../App.css';

const JumboImage = (props) => {
  return (
    <div>
      <Jumbotron style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover' }} fluid>
        <Container fluid>
          <h1 className="display-3">Fluid jumbotron</h1>
          <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default JumboImage;