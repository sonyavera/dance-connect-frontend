import React from 'react'
import '../App.css';
import {Button, Container, Row, Column} from 'reactstrap'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import PurchaseClassModal from '../components/PurchaseClassModal'
import Comments from './Comments'

class ClassShowPage extends React.Component{

    state = {
        danceClass: null,
        purchased: null,
        comments: null
    }

componentDidMount(){
    fetch("http://localhost:3000/dance_classes/" + this.props.danceClassId)
    .then(resp=> resp.json())
    .then(resp => this.setState({danceClass: resp.dance_class[0]}))

    fetch("http://localhost:3000/dance_classes/" + this.props.danceClassId + "/comments")
    .then(resp=> resp.json())
    // .then(resp => console.log(resp.dance_class_comments))
    .then(resp => this.setState({comments: resp.dance_class_comments}, ()=> console.log("state comments", this.state.comments)))
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

  renderContent=()=>{
    const idsOfPurchasedClasses = this.props.purchases.map(purchase => purchase.id)
    if(localStorage.token){  
      if(idsOfPurchasedClasses.includes(this.state.danceClass.id)){
        console.log("this class has been purchased")
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
          <PurchaseClassModal id="purchase-class" danceClassObj={this.state.danceClass} handlePurchase={this.handlePurchase}/>
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
      console.log("state", this.state)
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

            <Comments comments={this.state.comments}/>
            
            </>
            :
            <h1>Loading</h1>
            
            } 

             </>
        )
    }

}

export default ClassShowPage;