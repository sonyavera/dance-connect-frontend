import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, NavLink
  } from 'reactstrap';
import {Link} from 'react-router-dom'
import Karelia from './Karelia.png'
import '../App.css';


class ClassCard extends React.Component{

  renderClassStyle=()=>{
    if(this.props.danceClass.style === "afrocubanfolklore"){
      return "Afro Cuban Folklore"
    }else if(this.props.danceClass.style == "cubansalsa"){
      return "Cuban Salsa"
    }else{return "Bachata"}
  }



    render(){


        return(
            <div>
            <Card>
              <CardImg class="card-img-bottom" top width="100%" src={Karelia} alt="Card image cap" />
              <CardBody>
                <CardTitle>{this.renderClassStyle()} with {this.props.danceClass.instructor_name}</CardTitle>
                <CardText>{this.props.danceClass.description}</CardText>
                <Button block tag={Link} to={this.props.danceClass.style + "/" + this.props.danceClass.id}>Take Class</Button>
              </CardBody>
            </Card>
          </div>
        )
    }


}

export default ClassCard;