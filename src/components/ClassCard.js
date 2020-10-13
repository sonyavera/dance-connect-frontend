import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button
  } from 'reactstrap';
import {Link} from 'react-router-dom'
import Karelia from './Karelia.png'
import '../App.css';
import PurchaseClassModal from './PurchaseClassModal'


class ClassCard extends React.Component{


  renderClassStyle=()=>{
    if(this.props.danceClass.style === "afrocubanfolklore"){
      return "Afro Cuban Folklore"
    }else if(this.props.danceClass.style === "cubansalsa"){
      return "Cuban Salsa"
    }else if(this.props.danceClass.style === "newyorksalsa"){
      return "New York Salsa"
    }else if(this.props.danceClass.style === "kizomba"){
      return "Kizomba"
    }else if(this.props.danceClass.style === "bachata"){
      return "Bachata"
    }else{return "Zouk"}
  }

  handlePurchase=(danceClassObj)=>{
    this.props.purchaseHandler(danceClassObj)
  }

  
  renderCtaButton=()=>{
    const idsOfPurchasedClasses = this.props.purchases.map(purchase => purchase.id)

    if(localStorage.token){  
      if(idsOfPurchasedClasses.includes(this.props.danceClass.id)){
        // console.log("this class has been purchased")
        return (
          <>
        <Button tag={Link} 
            to={"purchases/" + this.props.danceClass.id} color="info" block >Go to Class</Button>
        
        </>
        )
      }  else{
        return (
          <>
          <PurchaseClassModal danceClassObj={this.props.danceClass} handlePurchase={this.handlePurchase}/>
          <Button 
                    block tag={Link} 
                    to={this.props.danceClass.style + "/" + this.props.danceClass.id}>Learn More
          </Button>
        </>
        )
      }
    }else {
      return <Button color="primary" block tag={Link} to="/login">Purchase Class</Button> 
    }
  }



  renderAvatar=()=>{
    if(this.props.danceClass.instructor_avatar === null){
      return "http://localhost:3000/" + this.props.danceClass.uploaded_avatar.split("?")[0]
    }else{
      return this.props.danceClass.instructor_avatar
    }
  }

    render(){
        return(
            <Card className="card-div">
              <CardImg class="card-img-bottom" className="card-image" top width="100%" height="245px" src={this.renderAvatar()} alt="Card image cap" />
              <CardBody>
                <CardTitle>{this.renderClassStyle()} with {this.props.danceClass.instructor_name}</CardTitle>
                <CardText>{this.props.danceClass.description}</CardText>
                <div id="button-div">
                {this.props.purchases ?
                  this.renderCtaButton()
                :
                  null
                }
                
                {localStorage.token ? 
                    <>
                    
                    </>
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