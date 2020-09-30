import React from 'react'
import '../App.css';
import ClassCard from'../components/ClassCard'
import {Redirect} from 'react-router-dom'


class PurchasesContainer extends React.Component{

    renderClasses=()=>{
        return this.props.purchasedClasses.map(danceClass => {
            return <ClassCard key={danceClass.id} danceClass={danceClass} purchases={this.props.purchasedClasses}/>
        })
    }

    render(){
        if(this.props.purchaseClasses){
            console.log('this.props from purchases container', this.props)
        }

        return(
            <>
            <center><h1>Your Purchased Classes</h1></center>
             <div className="container-fluid" className="m-5" cl-md-xx>
            <div className="card-columns" >
            {this.props.classes && this.props.user && this.props.purchasedClasses ? 
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

export default PurchasesContainer;