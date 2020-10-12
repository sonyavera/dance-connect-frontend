import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {


    state = {
        complete: false
    }

    submit = async () => {
        let {token} = await this.props.stripe.createToken({name: 'Name'});
        let response = await fetch('http://localhost:3000/charges', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                token: token.id,
                orderId: this.props.orderId
            })
        })

        if(response.ok){
            this.setState({
                complete: true
            })
        }
    }

    render(){
        if(this.state.complete) return <h1>Purchase complete!</h1>
        return(
            <div className="checkout">
                <p>Would you like to complete the purchase?</p>
                <CardElement/>
                <button onClick={this.submit}>Purchase</button>
            </div>
        )
    }

}

export default injectStripe(CheckoutForm);