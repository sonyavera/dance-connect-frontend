import React, { useState, useEffect } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Redirect, Link} from 'react-router-dom'
import '../App.css'
const stripePromise = loadStripe("pk_test_51HaMMsAbaOzC9OK8iZXsP2DNQRh9puo3rkXIYxqdNgXNp3BsDeoWAanuoHECrFT2FgdPuusevNvwmvmVCNyhT14300Rl4YwcIC");


const PurchaseClassModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);



  const printStyle=(style)=>{
    if(style="bachata"){
      return "Bachata"
    }if(style="zouk"){
      return "Zouk"
    }if(style="afrocubanfolklore"){
      return "Afro Cuban Folklore"
    }if(style="cubansalsa"){
      return "Cuban Salsa"
    }if(style="newyorksalsa"){
      return "New York Salsa"
    }
  }
  

  const handleClick = async (event) => {
    const token = localStorage.getItem("token")
    const stripe = await stripePromise;

    const response = await fetch("https://dance-connect.herokuapp.com/create-session", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({class_id: props.danceClassObj.id})
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


  return (
    <div>
      <Button id="purchase-class-button" color="primary" block onClick={toggle}>Purchase Class</Button>
      <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Purchase Class</ModalHeader>
        <ModalBody>
          <h4>Instructor: {props.danceClassObj.instructor_name}</h4>
          <h4>Style: {printStyle(props.danceClassObj.style)}</h4>
          <h4>Level: {props.danceClassObj.level}</h4> 
          <h4>Price: ${props.danceClassObj.price}</h4>
        </ModalBody>
        <ModalFooter>
        <Button color="primary" tag={Link} 
                onClick={handleClick}>Check Out With Stripe</Button>


          <Button color="secondary" onClick={toggle}>Cancel</Button>

        </ModalFooter>
      </Modal>
    </div>
  );
}

export default PurchaseClassModal;