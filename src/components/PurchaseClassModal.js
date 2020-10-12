import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Redirect, Link} from 'react-router-dom'
import '../App.css'
import CheckoutForm from './PurchaseClassModal'
import {Elements, StripeProvider} from 'react-stripe-elements'

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
          <Button 
            tag={Link} 
            to={props.danceClassObj.style + "/" + props.danceClassObj.id}
            color="primary" 
            onClick={handlePurchase}>Purchase Class</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>

          {/* <StripeProvider apiKey="pk_test_51HaMMsAbaOzC9OK8iZXsP2DNQRh9puo3rkXIYxqdNgXNp3BsDeoWAanuoHECrFT2FgdPuusevNvwmvmVCNyhT14300Rl4YwcIC">
            <div className="example">
              <Elements>
              <CheckoutForm orderId={props.danceClassObj.id}/>
              </Elements>
            </div>
          </StripeProvider> */}

        </ModalFooter>
      </Modal>
    </div>
  );
}

export default PurchaseClassModal;