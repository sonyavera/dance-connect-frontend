import React from 'react';
import { Button } from 'reactstrap';
import ReactDOM from 'react-dom';
import '../App.css';


class MyClasses extends React.Component {

    renderClasses=()=>{
        return this.props.classes.map(danceClass => {
            return <h1>Placeholder</h1>
        })
    }

    render(){


        return(
            <>
            {this.props.classes ? 
            this.renderClasses()
            :
            <h1>loading</h1>
            }
            </>
        )
    }


}

export default MyClasses;