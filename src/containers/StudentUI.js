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
            <center><h3>Featured Classes</h3></center>
            {this.props.classes ?
            <ScrollDiv 
                purchases={this.props.purchases}
                danceClasses={this.props.classes.slice(1,10)} 
                purchaseHandler={this.props.purchaseHandler}/>
            :
            null
            }
            
            <center><h3>Your Recommendations</h3></center>
            &nbsp;
            {this.props.classes ?
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