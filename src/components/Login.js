import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Row, Button, Form, FormGroup, Label, Input, NavLink } from 'reactstrap';
import '../App.css';


class Login extends React.Component {

    state = {
        username: null,
        password: null
    }

    formHandler=()=>{
        this.props.logIn(this.state)
    }

    changeHandler=(e)=>{
        this.setState({ [e.target.name]: e.target.value})
        console.log("this.state",this.state)
    }
    

    render(){

        return(
            <div id="form-div">
            <Form id="signup-form">

   
   
    
         <Row form>
           <Col md={8} sm="12" md={{ size: 6, offset: 3 }}>
             <FormGroup>
               <Input onChange={this.changeHandler} value={this.state.username} type="email" name="username" placeholder="username" />
             </FormGroup>
           </Col>
         </Row>

         <Row form>
           <Col md={6} sm="12" md={{ size: 6, offset: 3 }}>
             <FormGroup>
               <Input onChange={this.changeHandler} value={this.state.password} type="email" name="password" placeholder="password" />
             </FormGroup>
           </Col>
         </Row>
   
      
   
         <Button block color="primary" onClick={this.formHandler}>Log In</Button> &nbsp;
         <div align="center">Don't have an account? <a href="/signup">Sign Up</a></div>
       </Form>
       </div>
        )
    }


}

export default Login;