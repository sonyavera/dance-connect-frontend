import React from 'react';
import '../App.css';
import {Redirect} from 'react-router-dom'
import ClassCard from '../components/ClassCard'


class ClassesContainer extends React.Component {

   
    
    renderClasses=()=>{    
        return this.props.classes.filter(danceClass => danceClass.style === this.props.danceStyle).map(danceClass => {
            return <ClassCard key={danceClass.id} danceClass={danceClass} purchaseHandler={this.props.purchaseHandler} purchases={this.props.purchases}/>
        })
    }


    render(){
        console.log("purchases in classes container", this.props.purchases, "user", this.props.user)
        return(
            <>

             <div className="container-fluid" className="m-5" cl-md-xx>
            <div className="card-columns" >
             {this.props.classes && this.props.danceStyle && this.props.purchases ? 
                this.renderClasses()
             :
             <Redirect to="/login"/>
            }
            
            </div>
            </div>

            </>
        )
    }


}

export default ClassesContainer;

