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

  const handlePurchase =() => {
      console.log("handle purchase")
      props.handlePurchase(props.danceClassObj)
  }


  const uppercaseFirstLetter=(style)=>{
    if(style === null){
      return "null"
    }return style.charAt(0).toUpperCase() + style.slice(1)
  }
  

  const handleClick = async (event) => {
    const token = localStorage.getItem("token")
    const stripe = await stripePromise;

    const response = await fetch("http://localhost:3000/create-session", {
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


  console.log(props.danceClassObj.id)

  return (
    <div>
      <Button id="purchase-class-button" color="primary" block onClick={toggle}>Purchase Class</Button>
      <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Purchase Class</ModalHeader>
        <ModalBody>
          <h4>Instructor: {props.danceClassObj.instructor_name}</h4>
          <h4>Style: {uppercaseFirstLetter(props.danceClassObj.style)}</h4>
          <h4>Level: {props.danceClassObj.level}</h4> 
          <h4>Price: {props.danceClassObj.price}</h4>

          <p>Confirm below to get lifetime access to this dance class.</p>
        </ModalBody>
        <ModalFooter>
        <Button tag={Link} 
                onClick={handleClick}>Purchase</Button>

          {/* <Button 
            tag={Link} 
            to={props.danceClassObj.style + "/" + props.danceClassObj.id}
            color="primary" 
            onClick={handlePurchase}>Purchase Class</Button> */}

          <Button color="secondary" onClick={toggle}>Cancel</Button>

        </ModalFooter>
      </Modal>
    </div>
  );
}

export default PurchaseClassModal;