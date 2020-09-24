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

  handlePurchase=()=>{
    this.props.purchaseHandler(this.props.danceClass.id)
  }

  
  renderCtaButton=()=>{
    const idsOfPurchasedClasses = this.props.purchases.map(purchase => purchase.id)
    console.log("ids of purchasec classes", idsOfPurchasedClasses, "class id", this.props.danceClass.id)
    if(localStorage.length > 0){  
      if(idsOfPurchasedClasses.includes(this.props.danceClass.id)){
        console.log("this class has been purchased")
        return <Button block >Start Class</Button>
      }  else{
        return <Button block onClick={this.handlePurchase}>Purchase Class</Button>
      }
    }else {
      return <Button block tag={Link} to="/login">Purchase Class</Button> 
    }
  }

    render(){
        return(
            <Card className="card-div">
              <CardImg class="card-img-bottom" top width="100%" src={Karelia} alt="Card image cap" />
              <CardBody>
                <CardTitle>{this.renderClassStyle()} with {this.props.danceClass.instructor_name}</CardTitle>
                <CardText>{this.props.danceClass.description}</CardText>
                <div id="button-div">
                {this.props.purchases ?
                this.renderCtaButton()
                :
                null
                }
                {localStorage.length > 0 ? 
                <Button 
                    block tag={Link} 
                    to={this.props.danceClass.style + "/" + this.props.danceClass.id}>Learn More
                </Button>
                :
                <Button 
                    block tag={Link} 
                    to="/login">Learn More
                </Button>
                }
                </div>
              </CardBody>
            </Card>
        )
    }


}

export default ClassCard;