import React from 'react'
import '../App.css';
import ClassCard from'../components/ClassCard'


class PurchasesContainer extends React.Component{


    // renderClasses=()=>{    
    //     return this.props.classes.filter(danceClass => danceClass.user_id === this.props.userId).map(danceClass => {
    //         return <ClassCard key={danceClass.id} danceClass={danceClass}/>
    //     })
    // }

    renderClasses=()=>{
        return this.props.classes.map(danceClass => {
            return <ClassCard key={danceClass.id} danceClass={danceClass} purchases={this.props.classes}/>
        })
    }

    render(){
        if(this.props.classes){
            console.log('this.props from purchases container', this.props)
        }

        return(
            <>
            <h1>Your Purchased Classes</h1>
             <div className="container-fluid" className="m-5" cl-md-xx>
            <div className="card-columns" >
            {this.props.classes ?
            this.renderClasses()
            :
            console.log('not working sry')
            }
            </div>
            </div>
            </>
        )
    }


}

export default PurchasesContainer;