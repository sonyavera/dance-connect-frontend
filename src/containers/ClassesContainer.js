import React from 'react';
import '../App.css';
import {Redirect} from 'react-router-dom'
import ClassCard from '../components/ClassCard'


class ClassesContainer extends React.Component {

   
    
    renderClasses=()=>{    
        const classesByStyle = this.props.classes.filter(danceClass => danceClass.style === this.props.danceStyle)
        return classesByStyle.map(danceClass => {
            return <ClassCard key={danceClass.id} danceClass={danceClass} purchaseHandler={this.props.purchaseHandler} purchases={this.props.purchases}/>
        })
    }

    render(){
        if(this.props.classes){
            const classesByStyle = this.props.classes.filter(danceClass => danceClass.style === this.props.danceStyle)
        }

        return(
            <>
            {localStorage.token ? 
            
                        <div className="container-fluid" className="m-5" cl-md-xx>
                        <div className="card-columns" >
                        {this.props.classes && this.props.danceStyle && this.props.purchases ? 
                            this.renderClasses()
                        :
                        <h1>Loading</h1>
                        }
                        </div>
                        </div>
            :
                        
            <Redirect/>
            

            }
 
            </>
        )
    }


}

export default ClassesContainer;

