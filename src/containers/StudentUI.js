import React from 'react';
import { Button } from 'reactstrap';
import ReactDOM from 'react-dom';
import '../App.css';
import ScrollDiv from '../components/ScrollDiv'



class StudentUI extends React.Component {

    state={
        featuredClasses: null,
        recommendedClasses: null,
    }


    render(){
        console.log("props in student ui", this.props)
        return(
            <>
            <h1> Student UI</h1>
            &nbsp;
            <h3>Featured Classes</h3>
            {this.props.classes ?
            <ScrollDiv 
                danceClasses={this.props.classes.slice(1,10)} 
                purchaseHandler={this.props.purchaseHandler}/>
            :
            null
            }
            
            <h3>Your Recommendations</h3>
            &nbsp;
            {this.props.classes ?
            <ScrollDiv 
                danceClasses={this.props.classes.slice(11,20)} 
                purchaseHandler={this.props.purchaseHandler}/>
            :
            null
            }
            </>
        )
    }


}

export default StudentUI;