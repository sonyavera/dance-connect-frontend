import React from 'react';
import { Button} from 'reactstrap';
import '../App.css';
import {Link} from 'react-router-dom'


class TeacherUI extends React.Component {

    render(){

        return(
            <>
            <h1> What would you like to do?</h1>
            &nbsp;
            <div className="container-sm">
            <Button tag={Link} to="/classes/new" color="info" size="lg" block>Create a Class</Button>
            &nbsp;
            <Button tag={Link} to="/me" color="primary" size="lg" block>Edit Your Profile</Button>
            &nbsp;
            <Button tag={Link} to="/stats" color="info" size="lg" block>View Your Stats</Button>
            &nbsp;
            <Button tag={Link} to="/home/student" color="primary" size="lg" block>Student Mode</Button>
            </div>
            </>
        )
    }


}

export default TeacherUI;