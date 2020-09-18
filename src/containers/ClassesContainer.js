import React from 'react';
import { Button } from 'reactstrap';
import ReactDOM from 'react-dom';
import '../App.css';
import ClassCard from '../components/ClassCard'


class ClassesContainer extends React.Component {

   
    
    renderClasses=()=>{    
        return this.props.classes.filter(danceClass => danceClass.style === this.props.style).map(danceClass => {
            return <ClassCard key={danceClass.id} danceClass={danceClass}/>
        })
    }

    componentDidMount(){
    }

    render(){
        console.log(this.props.style)

        return(
            <>
            {this.props.classes && this.props.style ? 
            this.renderClasses()
            :
            <h1>loading</h1>
            }
            </>
        )
    }


}

export default ClassesContainer;