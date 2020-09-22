import React from 'react';
import { Button } from 'reactstrap';
import ReactDOM from 'react-dom';
import '../App.css';
import {Redirect} from 'react-router-dom'


class CreateClass extends React.Component {

    render(){


        return(
            <>
            {localStorage.length > 0 ? 
            
            <h1> Create Class</h1>
            
            :
            <Redirect to="/login"/>
            
            }
            </>
        )
    }


}

export default CreateClass;