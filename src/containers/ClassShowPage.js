import React from 'react'
import '../App.css';
import {Button, Container} from 'reactstrap'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'

class ClassShowPage extends React.Component{

    state = {
        danceClass: null,
        purchased: null
    }

componentDidMount(){
    fetch("http://localhost:3000/dance_classes/" + this.props.danceClassId)
    .then(resp=> resp.json())
    .then(resp => this.setState({danceClass: resp}))
}

handlePurchase=()=>{
    this.props.purchaseHandler(this.props.danceClassId)
}

renderClassStyle=()=>{
  if(this.state.danceClass.dance_class[0].style === "afrocubanfolklore"){
    return "Afro Cuban Folklore"
  }else if(this.state.danceClass.dance_class[0].style === "cubansalsa"){
    return "Cuban Salsa"
  }else if(this.state.danceClass.dance_class[0].style === "newyorksalsa"){
    return "New York Salsa"
  }else if(this.state.danceClass.dance_class[0].style === "kizomba"){
    return "Kizomba"
  }else if(this.state.danceClass.dance_class[0].style === "bachata"){
    return "Bachata"
  }else{return "Zouk"}
  }



 

  renderContent=()=>{
    const idsOfPurchasedClasses = this.props.purchases.map(purchase => purchase.id)
    if(localStorage.length > 0){  
      if(idsOfPurchasedClasses.includes(this.state.danceClass.dance_class[0].id)){
        console.log("this class has been purchased")
        return (
          <>
          <ReactPlayer id="react-player" url={this.state.danceClass.dance_class[0].url}/>
          </>
        )
      }  else{
        return (
          <>
          <img id="instructor-img" src={this.state.danceClass.dance_class[0].instructor_avatar} alt=""/>
          <h5>Price: {this.state.danceClass.dance_class[0].price}</h5> 
          <h5>{this.state.danceClass.dance_class[0].description}</h5>
          <span><Button color="primary" onClick={this.handlePurchase}>Purchase Class</Button></span>
          </>
          )
      }
    }else {
      return <Button color="primary" block tag={Link} to="/login">Purchase Class</Button> 
    }
  }




    render(){
        console.log("all attributes", this.props)
        return(
            <>
            {this.state.danceClass ?
            <>
            <div className="back-button">
            <Button 
                tag={Link} 
                to={"/classes/" + this.state.danceClass.dance_class[0].style}> ← back to all {this.renderClassStyle()} classes
            </Button>
            </div>
            
            <center><Container>
            <h1>{this.renderClassStyle()} with {this.state.danceClass.dance_class[0].instructor_name}</h1>
            
            
            </Container></center>
            &nbsp;


            <center><Container width="100px">
            {this.renderContent()} &nbsp;
            {/* {this.state.danceClass.dance_class[0].description} &nbsp; */}
            </Container></center>
            &nbsp;
            </>
            :
            <h1>Loading</h1>
            
            } 

             </>
        )
    }

}

export default ClassShowPage;