import React from 'react';
import '../App.css';
import ClassCard from '../components/ClassCard'


class ClassesContainer extends React.Component {

   
    
    renderClasses=()=>{    
        return this.props.classes.filter(danceClass => danceClass.style === this.props.danceStyle).map(danceClass => {
            return <ClassCard key={danceClass.id} danceClass={danceClass} purchaseHandler={this.props.purchaseHandler} purchases={this.props.purchases}/>
        })
    }


    render(){
        console.log("purchases in classes container", this.props.purchases)
        return(
            <>

             <div className="container-fluid" className="m-5" cl-md-xx>
            <div className="card-columns" >
             {this.props.classes && this.props.danceStyle && this.props.purchases ? 
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

