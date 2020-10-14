import React, { UseState} from 'react'
import { loadStripe } from "@stripe/stripe-js";
import '../App.css';
import {Button, Container, Row, Column} from 'reactstrap'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import PurchaseClassModal from '../components/PurchaseClassModal'
const stripePromise = loadStripe("pk_test_51HaMMsAbaOzC9OK8iZXsP2DNQRh9puo3rkXIYxqdNgXNp3BsDeoWAanuoHECrFT2FgdPuusevNvwmvmVCNyhT14300Rl4YwcIC");


class ClassShowPage extends React.Component{

    state = {
        danceClass: null,
        purchased: null,
        justPurchased: false
    }

componentDidMount(){
    fetch("http://localhost:3000/dance_classes/" + this.props.danceClassId)
      .then(resp=> resp.json())
      .then(resp => this.setState({danceClass: resp.dance_class[0]}))
    const url = window.location.href
    if(url.includes("success")){
      alert("Purchase was successful!")
      this.setState({justPurchased: true})
    }

}

handlePurchase=()=>{
    this.props.purchaseHandler(this.state.danceClass)
}

renderClassStyle=()=>{
  if(this.state.danceClass.style === "afrocubanfolklore"){
    return "Afro Cuban Folklore"
  }else if(this.state.danceClass.style === "cubansalsa"){
    return "Cuban Salsa"
  }else if(this.state.danceClass.style === "newyorksalsa"){
    return "New York Salsa"
  }else if(this.state.danceClass.style === "kizomba"){
    return "Kizomba"
  }else if(this.state.danceClass.style === "bachata"){
    return "Bachata"
  }else{return "Zouk"}
  }


  renderAvatar=()=>{
    if(this.state.danceClass.instructor_avatar === null){
      return "http://localhost:3000/" + this.state.danceClass.uploaded_avatar.split("?")[0]
    }else{
      return this.state.danceClass.instructor_avatar
    }
  }

  handleClick = async (event) => {
    const token = localStorage.getItem("token")
    const stripe = await stripePromise;
    const response = await fetch("http://localhost:3000/create-session", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({class_id: this.state.danceClass.id})
    });
    const session = await response.json();
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  renderContent=()=>{
    const idsOfPurchasedClasses = this.props.purchases.map(purchase => purchase.id)
    if(localStorage.token){  
      if(idsOfPurchasedClasses.includes(this.state.danceClass.id)){
        return (
          <>
          
          <ReactPlayer id="react-player" url={this.state.danceClass.url}/>
          </>
        )
      }  else{
        return (
          <>
          <img id="instructor-img" src={this.renderAvatar()} alt=""/>
          <div id="class-info">
          <p id="price"><strong >Price:</strong> ${this.state.danceClass.price} </p>
          <p id="description-title"><strong>Class Description:</strong></p> <p id="description">{this.state.danceClass.description}</p>
          {/* <PurchaseClassModal id="purchase-class" danceClassObj={this.state.danceClass} handlePurchase={this.handlePurchase}/> */}
          <Button id="purchase-class-button" color="primary" block onClick={this.handleClick}>Purchase Class</Button>
          </div>
          {/* <Button id="purchase-class" color="primary" onClick={this.handlePurchase}>Purchase Class</Button> */}
          </>
          )
      }
    }else {
      return <Button color="primary" block tag={Link} to="/login">Purchase Class</Button> 
    }
  }

    render(){
        return(
            <>
            {this.state.danceClass ?
            <>
            <div className="back-button">
            <Button tag={Link} to={"/classes/" + this.state.danceClass.style}>
                 ← back to all {this.renderClassStyle()} classes
            </Button>
            </div>
            
            
            <div id="show-page">

              <h1 id="class-style">{this.renderClassStyle()} with {this.state.danceClass.instructor_name}</h1>

              {this.renderContent()} 

            </div>
            
            </>
            :
            <h1>Loading</h1>
            
            } 

             </>
        )
    }

}

export default ClassShowPage;