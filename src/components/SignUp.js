import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, NavLink } from 'reactstrap';
import '../App.css';

class SignUp extends React.Component {

    state = {
        firstName: null,
        lastName: null,
        accountType: null,
        username: null,
        password: null,
        confirmedPw: null
    }


    formHandler=()=>{
        this.props.signUp(this.state)
    }

    changeHandler=(e)=>{
        this.setState({ [e.target.name]: e.target.value})
        console.log("this.state",this.state)
    }




    render(){
        return (
            <div id="form-div">
               <Form id="signup-form">
              <Row form>
              <Col md={6}>
                <FormGroup>
                  <Input onChange={this.changeHandler} value={this.state.firstName} type="text" name="firstName" placeholder="first name"/>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Input onChange={this.changeHandler} value={this.state.lastName} type="text" name="lastName"  placeholder="last name"/>
                </FormGroup>
              </Col>
            </Row>
      

            <Row form>
              <Col md={6} sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input onChange={this.changeHandler} value={this.state.username} type="text" name="username" placeholder="username" />
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={6} sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input onChange={this.changeHandler} value={this.state.password} type="text" name="password" id="exampleEmail" placeholder="password" />
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={6} sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input onChange={this.changeHandler} value={this.state.confirmedPw} type="text" name="confirmedPw" placeholder="confirm password" />
                </FormGroup>
              </Col>
            </Row>
      
      
      
         
      
            <Button block color="primary" onClick={this.formHandler}>Sign Up</Button> &nbsp;
            <div align="center">Already have an account? <a href="/login">Log In</a></div>
          </Form>
          </div>
        );
    }



}

export default SignUp;