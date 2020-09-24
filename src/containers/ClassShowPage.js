import React from 'react'
import { isCompositeComponent } from 'react-dom/test-utils';
import '../App.css';
import {Button, Container} from 'reactstrap'
import { Link } from 'react-router-dom'

class ClassShowPage extends React.Component{

    state = {
        danceClass: null
    }


componentDidMount(){
    fetch("http://localhost:3000/dance_classes/" + this.props.danceClassId)
    .then(resp=> resp.json())
    .then(resp => this.setState({danceClass: resp}, ()=> console.log("state after fetch", this.state.danceClass.dance_class[0].style) ))
}

handlePurchase=()=>{
    this.props.purchaseHandler(this.props.danceClassId)
}

renderClassStyle=()=>{
    if(this.state.danceClass.dance_class[0].style === "afrocubanfolklore"){
      return "Afro Cuban Folklore"
    }else if(this.state.danceClass.dance_class[0].style == "cubansalsa"){
      return "Cuban Salsa"
    }else{return "Bachata"}
  }

    render(){
        console.log("all attributes", this.state.danceClass)
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
            
            </Container>
            <Container width="100px">
            <Button onClick={this.handlePurchase} block color="primary">Purchase Class</Button>

            </Container>
            </div>
            :
            <h1>Loading</h1>
            } 

             </>
        )
    }

}

export default ClassShowPage;