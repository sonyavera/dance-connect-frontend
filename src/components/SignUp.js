import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import '../App.css';

class SignUp extends React.Component {

    state = {
        firstName: null,
        lastName: null,
        accountType: null,
        avatar: null,
        username: null,
        password: null,
        confirmedPw: null,
        selectedOption: null,
        doPasswordsMatch: null,
        isFormFilled: null,
        isButtonDisabled: true
    }


    formHandler=()=>{
        this.props.signUp(this.state)
    }

    changeHandler=(e)=>{
        this.setState({ [e.target.name]: e.target.value}, ()=> this.manageForm())  
    }

    manageForm=()=>{
      const formFields = [this.state.firstName, 
                          this.state.lastName, 
                          this.state.selectedOption, 
                          this.state.avatar, 
                          this.state.username,
                          this.state.password,
                          this.state.confirmedPw
                        ]
      if(!formFields.includes(null) && !formFields.includes("")){
        this.setState({isFormFilled: true})
      }else{
        this.setState({isFormFilled: false})
      }

      this.managePasswordMatch()
    }

    managePasswordMatch=()=>{
      if(this.state.confirmedPw && this.state.password && this.state.password === this.state.confirmedPw){
        this.setState({ doPasswordsMatch: true}, ()=> this.manageButtonLogic())
      }else {
        this.setState({ doPasswordsMatch: false}, ()=> this.manageButtonLogic())   
        }

      
    }

    manageButtonLogic=()=>{
      if(this.state.isFormFilled && this.state.doPasswordsMatch){
        this.setState({isButtonDisabled: false})
      }else{
        this.setState({isButtonDisabled: true})
      }
    }


    avatarChangeHandler=(e)=>{
        this.setState({avatar: e.target.files[0]}, ()=> this.manageForm())
    }
      

    handleOptionChange=(changeEvent)=>{
      this.setState({
        selectedOption: changeEvent.target.value
      }, ()=> this.manageForm());
    }

    render(){
        return (
            <div className="form-div">
               <Form className="inner-form">
               <center><h2>Sign Up</h2></center> &nbsp;
              <Row form>
              <Col md={6}>
                <FormGroup>
                  <Input 
                    onChange={this.changeHandler} 
                    value={this.state.firstName} 
                    type="text" 
                    name="firstName" 
                    placeholder="first name"/>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Input 
                    onChange={this.changeHandler} 
                    value={this.state.lastName} 
                    type="text" 
                    name="lastName"  
                    placeholder="last name"/>
                </FormGroup>
              </Col>
            </Row>
      
            <Row form>
              <Col md={6} sm="12" md={{ size: 6, offset: 3 }}>
                
              <FormGroup>
                <Label for="exampleFile"></Label>
                    <Input onChange={this.avatarChangeHandler} type="file" name="avatar" id="exampleFile" />
                    <FormText color="muted">
                      Upload a picture to be used for your profile.
              </FormText>
              </FormGroup>
      
              </Col>
            </Row>

            <Row form>
              <Col md={6} sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input onChange={this.changeHandler} 
                  value={this.state.username} 
                  type="text" 
                  name="username" 
                  placeholder="username" />
                </FormGroup>
              </Col>
            </Row>




            <Row form>
              <Col md={6} sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input 
                    onChange={this.changeHandler} 
                    value={this.state.password} 
                    type="password" 
                    name="password" 
                    id="exampleEmail" 
                    placeholder="password" />
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={6} sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input 
                    onChange={this.changeHandler} 
                    value={this.state.confirmedPw} 
                    type="password" 
                    name="confirmedPw" 
                    placeholder="confirm password" />
                    {this.state.confirmedPw ?
                    
                      this.state.confirmedPw.length > 0 && this.state.doPasswordsMatch === false ?
                      <h4 className="password-warning">Passwords must match</h4>
                      :
                      null

                    :
                    null
                    }
                </FormGroup>
              </Col>
            </Row>

            <Row form>
                <FormGroup className="radio-btns" tag="fieldset">
                 {" "}
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" 
                             value="student" 
                             checked={this.state.selectedOption === 'student'} 
                             onChange={this.handleOptionChange}
                             />{' '}
                      Student
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" 
                             value="teacher" 
                             checked={this.state.selectedOption === 'teacher'} 
                             onChange={this.handleOptionChange}
                            />{' '}
                      Teacher
                    </Label>
                  </FormGroup>
                  </FormGroup>
    

            </Row>
      
      
      
         
      
            <Button id="signup-btn" disabled={this.state.isButtonDisabled} block color="primary" onClick={this.formHandler}>Sign Up</Button>

            <div align="center">
            Already have an account?  
            <a href="/login"> Log In</a>
            </div>
          </Form>
          </div>
        );
    }


                /* {this.state.forEach(state => state !== null) ?
                      this.state.confirmedPw.length > 0 && this.state.disableSubmitButton === true ? 

                      <h4 className="password-warning">Passwords must match</h4>
                      :
                      null
                    :
                    null
                    } &nbsp; */

}

export default SignUp;