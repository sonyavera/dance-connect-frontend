import React from 'react';
import { Button } from 'reactstrap';
import ReactDOM from 'react-dom';
import '../App.css';
import ClassCard from '../components/ClassCard'


class ClassesContainer extends React.Component {

   
    
    renderClasses=()=>{    
        return this.props.classes.filter(danceClass => danceClass.style === this.props.danceStyle).map(danceClass => {
            return <ClassCard key={danceClass.id} danceClass={danceClass}/>
        })
    }

    componentDidMount(){
    }

    render(){
        console.log("in classes container", this.props.danceStyle)
        if(this.props.classes){
            console.log("first dance class style", this.props.classes[8].style)
            console.log(this.renderClasses())
        }

        return(
            <>
             {this.props.classes && this.props.danceStyle ? 
                this.renderClasses()
             :
            <h1>loading</h1>
            }
            </>
        )
    }


}

export default ClassesContainer;

