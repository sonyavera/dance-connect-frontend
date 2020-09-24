import React from 'react'
import '../App.css';
import {Button, Container} from 'reactstrap'
import { Link } from 'react-router-dom'

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
    }else{return "Bachata"}
  }


  renderCtaButton=()=>{
    const idsOfPurchasedClasses = this.props.purchases.map(purchase => purchase.id)
    if(localStorage.length > 0){  
      if(idsOfPurchasedClasses.includes(this.state.danceClass.dance_class[0].id)){
        console.log("this class has been purchased")
        // this.setState({purchased: true})
        return <Button color="info" block >Start Class</Button>
      }  else{
        // this.setState({purchased: false})
        return <Button color="primary" block onClick={this.handlePurchase}>Purchase Class</Button>
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
            <div className="back-button">
            <Button 
                tag={Link} 
                to={"/classes/" + this.state.danceClass.dance_class[0].style}> ← back to all {this.renderClassStyle()} classes
            </Button>
            
            <Container>
            <h1>{this.renderClassStyle()} with {this.state.danceClass.dance_class[0].instructor_name}</h1>
            <img id="instructor-img" src={this.state.danceClass.dance_class[0].instructor_avatar} alt=""/>
            {this.state.danceClass.dance_class[0].style}
            {this.state.danceClass.dance_class[0].description}
            Price: {this.state.danceClass.dance_class[0].price}
            </Container>
            &nbsp;


            {this.state.purchased === true ?
            <h1>Render embedded video</h1>
            :
            "render instructor image"}


            <Container width="100px">
            {this.renderCtaButton()}
            </Container>
            &nbsp;
            </div>
            :
            <h1>Loading</h1>
            } 

             </>
        )
    }

}

export default ClassShowPage;