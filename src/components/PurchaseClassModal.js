import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Redirect, Link} from 'react-router-dom'
import '../App.css'

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

  return (
    <div>
      <Button id="purchase-class-button" color="primary" block onClick={toggle}>Purchase Class</Button>
      <Modal isOpen={modal} fade={false} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Purchase Class</ModalHeader>
        <ModalBody>
          Instructor: {props.danceClassObj.instructor_name} &nbsp;
          Style: {props.danceClassObj.style} &nbsp;
          Level: {props.danceClassObj.level} &nbsp;
          Price: {props.danceClassObj.price} &nbsp;

          Confirm below to get lifetime access to this dance class.
        </ModalBody>
        <ModalFooter>
          <Button 
            tag={Link} 
            to={props.danceClassObj.style + "/" + props.danceClassObj.id}
            color="primary" 
            onClick={handlePurchase}>Purchase Class</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default PurchaseClassModal;