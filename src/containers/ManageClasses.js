import React from 'react'
import '../App.css'
import ClassCard from '../components/ClassCard'
import {Redirect} from 'react-router-dom'


class ManageClasses extends React.Component{

    
    renderClasses=()=>{
        return this.props.createdClasses.map(danceClass => {
            return <ClassCard key={danceClass.id} danceClass={danceClass}/>
        })
    }
    
    
    
    render(){

        console.log('props in manage classes', this.props)
        return(
            <>
            {localStorage.token ? 
            
                        <div className="container-fluid" className="m-5" cl-md-xx>
                        <div className="card-columns" >
                        {this.props.createdClasses ? 
                            this.renderClasses()
                        :
                        <h1>Loading</h1>
                        }
                        </div>
                        </div>
            :
                        
            <Redirect to="/login"/>
            

            }
 
            </>
        )
    }



}

export default ManageClasses;