import React from 'react'
import '../App.css';
import ClassCard from'../components/ClassCard'
import {Redirect} from 'react-router-dom'


class PurchasesContainer extends React.Component{


// remove this after refactor
    componentDidMount(){
            const token = localStorage.getItem("token")
            fetch('http://localhost:3000/me/dance_classes', {
              method: "GET",
              headers: { Authorization: `Bearer ${token}`},
            })
              .then(resp => resp.json())
              .then(resp => this.setState({purchasedClasses: resp.purchased_dance_classes, 
                                          createdClasses: resp.created_dance_classes} ))
              .catch((error) => {console.log(error)})
    }
    

    renderClasses=()=>{
        return this.props.purchasedClasses.map(danceClass => {
            return <ClassCard key={danceClass.id} danceClass={danceClass} purchases={this.props.purchasedClasses}/>
        })
    }

    render(){

        return(
            <>
            <center><h1>Your Purchased Classes</h1></center>
             <div className="container-fluid" className="m-5" cl-md-xx>
            <div className="card-columns" >
            {this.props.classes && this.props.user && this.props.purchasedClasses ? 
            this.renderClasses()
            :
            <>
            <h1>Loading...</h1>
            </>
            }
            </div>
            </div>
            </>
        )
    }


}

export default PurchasesContainer;