import React from 'react'
import '../App.css';
import ClassCard from'../components/ClassCard'


class PurchasesContainer extends React.Component{


    renderClasses=()=>{    
        return this.props.classes.filter(danceClass => danceClass.user_id === this.props.userId).map(danceClass => {
            return <ClassCard key={danceClass.id} danceClass={danceClass}/>
        })
    }

    render(){
        if(this.props.classes){
            console.log('this.props from purchases container', this.props)
        }

        return(
            <>
            {this.props.classes && this.props.userId ?
            console.log("hi")
            :
            console.log('bye')
            }
            <h1>Purchases Container</h1>
            </>
        )
    }


}

export default PurchasesContainer;