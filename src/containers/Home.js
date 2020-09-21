import React from 'react';
import { Button } from 'reactstrap';
import ReactDOM from 'react-dom';
import '../App.css';
import ScrollDiv from '../components/ScrollDiv'



class Home extends React.Component {


    renderPurchases=()=>{
        console.log("purchases container")
    }


    render(){
        console.log("props in home", this.props)

        return(
            <>
            <h1> Home</h1>
            <ScrollDiv/>
            </>
        )
    }


}

export default Home;