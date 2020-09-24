import React from 'react';
import '../App.css';




class Home extends React.Component {


    renderPurchases=()=>{
        console.log("purchases container")
    }


    render(){
        console.log("props in home", this.props)

        return(
            <>
            <h1> Home</h1>
            </>
        )
    }


}

export default Home;