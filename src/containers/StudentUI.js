import React from 'react';
import { Redirect } from 'react-router-dom';
import '../App.css';
import ScrollDiv from '../components/ScrollDiv'



class StudentUI extends React.Component {

    state={
        featuredClasses: null,
        recommendedClasses: null,
        classes: null
    }

    componentDidMount(){
        fetch("http://localhost:3000/dance_classes")
        .then(resp => resp.json())
        .then(resp => this.setState({classes: resp.classes}))
    }


    render(){
        console.log('this.props', this.props)
        return(
            <>

            {localStorage.token ?
            
                this.state.classes && this.props.purchases ?
                <>
                <center><h2>Featured Classes</h2></center>
                <ScrollDiv 
                    purchases={this.props.purchases}
                    danceClasses={this.state.classes.slice(1,10)} 
                    purchaseHandler={this.props.purchaseHandler}/>
            
                <center><h2>Your Recommendations</h2></center>
                <ScrollDiv 
                    purchases={this.props.purchases}
                    danceClasses={this.state.classes.slice(11,20)} 

                    purchaseHandler={this.props.purchaseHandler}/>
                </>
                :

                null

            :

            <Redirect to="/login"/>

            }
            </>
        )
    }


}

export default StudentUI;