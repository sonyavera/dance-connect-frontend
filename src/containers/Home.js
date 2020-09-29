import React from 'react';
import { ListGroupItemHeading } from 'reactstrap';
import '../App.css';
import TeacherScrollDiv from '../components/TeacherScrollDiv'




class Home extends React.Component {

    
    state ={
        danceClasses: null
    }
    
    componentDidMount=()=>{
        console.log('component did mount')
        fetch("http://localhost:3000/unique_dance_classes")
            .then(resp => resp.json())
            .then(resp => this.setState({danceClasses: resp.unique_dance_class_array}, ()=> console.log(this.state.danceClasses)))
            // .then(resp => console.log('resp in home', resp))
    }


    


    render(){
        return(
            <>
            <center><h1>Meet the Instructors</h1></center>
            {this.state.danceClasses ?
            <TeacherScrollDiv id="scroll-div" danceClasses={this.state.danceClasses}/>
            :
            <h1>Loading...</h1>
            }
            </>
        )
    }


}

export default Home;