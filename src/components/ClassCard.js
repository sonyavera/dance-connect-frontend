import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import Karelia from './Karelia.png'


class ClassCard extends React.Component{

    render(){


        return(
            <div>
            <Card>
              <CardImg top width="100%" src='./Karelia/318x180.png' alt="Card image cap" />
              <CardBody>
                <CardTitle>{this.props.danceClass.style} with User_id:{this.props.danceClass.user_id}</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
          </div>
        )
    }


}

export default ClassCard;