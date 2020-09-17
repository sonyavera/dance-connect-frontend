import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, NavLink } from 'reactstrap';

class SignUp extends React.Component {

    state = {
        firstName: null,
        lastName: null,
        accountType: null,
        username: null,
        password: null
    }

    formHandler=()=>{
        console.log("form submitted")
    }

    render(){
        return (
            <div id="form-div">
               <Form id="signup-form">
              <Row form>
              <Col md={6}>
                <FormGroup>
                  <Input type="text" name="city" id="firstName" placeholder="first name"/>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Input type="text" name="last-name" id="lastName" placeholder="last name"/>
                </FormGroup>
              </Col>
            </Row>
      
      
       
            <Row form>
              <Col md={8} sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input type="email" name="email" id="exampleEmail" placeholder="email" />
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={6} sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input type="email" name="email" id="exampleEmail" placeholder="username" />
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={6} sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input type="email" name="email" id="exampleEmail" placeholder="password" />
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={6} sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input type="email" name="email" id="exampleEmail" placeholder="confirm password" />
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