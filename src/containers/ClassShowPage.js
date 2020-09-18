import React from 'react'
import { isCompositeComponent } from 'react-dom/test-utils';
import '../App.css';
import {Button} from 'reactstrap'
import { Link } from 'react-router-dom'

class ClassShowPage extends React.Component{

    state = {
        danceClass: null
    }


componentDidMount(){
    fetch("http://localhost:3000/dance_classes/" + this.props.classId)
    .then(resp=> resp.json())
    .then(resp => this.setState({danceClass: resp}, ()=> console.log(this.state.danceClass)))
}

renderClassStyle=()=>{
    if(this.state.danceClass.dance_class[0].style === "afrocubanfolklore"){
      return "Afro Cuban Folklore"
    }else if(this.state.danceClass.dance_class[0].style == "cubansalsa"){
      return "Cuban Salsa"
    }else{return "Bachata"}
  }

    render(){
        console.log(this.props.classId)
        if(this.state.danceClass){
            console.log('this.state.danceClass', this.state.danceClass.dance_class[0])
        }


        return(
            <>
            {this.state.danceClass ?
            <div className="back-button">
            <Button tag={Link} to={"/classes/" + this.state.danceClass.dance_class[0].style}> ← back to all {this.renderClassStyle()} classes</Button>
            </div>
            :
            <h1>loading</h1>
            }

            <h1>Class Show page</h1>
            </>
        )
    }

}

export default ClassShowPage;