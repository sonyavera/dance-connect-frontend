import React from 'react';
import '../App.css';




class Home extends React.Component {



    getInstructors=()=>{
        // write a new route in order to get all the teachers
    }

    render(){
        console.log("props in home", this.props.classes)
        if(this.props.classes){

            console.log(this.props.classes.map(danceClass => danceClass.user_id))
        }

        return(
            <>
            <h1> Home</h1>
            </>
        )
    }


}

export default Home;