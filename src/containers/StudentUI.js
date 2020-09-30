import React from 'react';
import '../App.css';
import ScrollDiv from '../components/ScrollDiv'



class StudentUI extends React.Component {

    state={
        featuredClasses: null,
        recommendedClasses: null,
    }


    render(){
        return(
            <>
            <center><h2>Featured Classes</h2></center>
            {this.props.classes && this.props.purchases ?
            <ScrollDiv 
                purchases={this.props.purchases}
                danceClasses={this.props.classes.slice(1,10)} 
                purchaseHandler={this.props.purchaseHandler}/>
            :
            null
            }
            
            <center><h2>Your Recommendations</h2></center>
            {this.props.classes && this.props.purchases ?
            <ScrollDiv 
                purchases={this.props.purchases}
                danceClasses={this.props.classes.slice(11,20)} 
                purchaseHandler={this.props.purchaseHandler}/>
            :
            null
            }
            </>
        )
    }


}

export default StudentUI;