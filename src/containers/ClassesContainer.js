import React from 'react';
import { Button } from 'reactstrap';
import ReactDOM from 'react-dom';
import '../App.css';
import ClassCard from '../components/ClassCard'
import {Container, Row, Col} from 'reactstrap'
import {Link} from 'react-router-dom'


class ClassesContainer extends React.Component {

   
    
    renderClasses=()=>{    
        return this.props.classes.filter(danceClass => danceClass.style === this.props.danceStyle).map(danceClass => {
            return <ClassCard key={danceClass.id} danceClass={danceClass}/>
        })
    }


    render(){
        if(this.props.classes){
            console.log("length of renderclasses", this.renderClasses().length)
            console.log("length of props classes", this.props.classes.length)
        }
        console.log("")
        return(
            <>

             <div className="container-fluid" className="m-5" cl-md-xx>
            <div className="card-columns" >
             {this.props.classes && this.props.danceStyle ? 
                this.renderClasses()
             :
            <h1>loading</h1>
            }
            
            </div>
            </div>

            </>
        )
    }


}

export default ClassesContainer;

