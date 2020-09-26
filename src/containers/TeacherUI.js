import React from 'react';
import { Button} from 'reactstrap';
import '../App.css';
import {Link} from 'react-router-dom'


class TeacherUI extends React.Component {

    render(){

        return(
            <>
            <center><h1> What would you like to do?</h1></center>
            &nbsp;
            <div className="container-sm">
                <Button 
                    tag={Link} 
                    to="/classes/new" 
                    id="top-left-button">
                    Create a Class
                    </Button>
                <Button 
                    tag={Link} 
                    to="/me" 
                    id="top-right-button">Edit Your Profile</Button>
                <Button 
                    tag={Link} 
                    to="/stats" 
                    id="bottom-left-button">View Your Stats</Button>
                <Button 
                    onClick={this.props.toggleMode} 
                    tag={Link} to="/home/student" 
                    id="bottom-right-button">Student Mode</Button>
            </div>
            
            </>
        )
    }


}

export default TeacherUI;