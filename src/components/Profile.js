import React from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {Redirect} from 'react-router-dom'
import '../App.css';


class Profile extends React.Component{

    state = {
        firstName: null,
        lastName: null,
        accountType: null,
        username: null,
        password: null,
        avatar: null,
        confirmedPw: null,
        selectedOption: null,
        disableSubmitButton: true
    }


    formHandler=()=>{
        this.props.editProfile(this.state)
    }

    changeHandler=(e)=>{
        this.setState({ [e.target.name]: e.target.value}, ()=> this.buttonLogic() )
    }
  


    buttonLogic=()=>{
      if(this.state.confirmedPw && this.state.password && this.state.password === this.state.confirmedPw){
        this.setState({ disableSubmitButton: false})
      }else {
        this.setState({ disableSubmitButton: true})   
        }
    }
      


    handleOptionChange=(changeEvent)=>{
      this.setState({
        selectedOption: changeEvent.target.value
      });
    }

    render(){
        return(
            <>
            {localStorage.length > 0 ?

              <div className="form-div">
               <Form className="inner-form">
               <center><strong>Edit Your Profile</strong></center>
               <img id="prof-page-avatar" src={this.props.user.avatar} alt=''/>
              <Row form>
              <Col md={6}>
                <FormGroup>             
                  <Input 
                    onChange={this.changeHandler} 
                    value={this.state.firstName} 
                    type="text" 
                    name="firstName" 
                    placeholder={this.props.user.first_name}/>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Input 
                    onChange={this.changeHandler} 
                    value={this.state.lastName} 
                    type="text" 
                    name="lastName"  
                    placeholder={this.props.user.last_name}/>
                </FormGroup>
              </Col>
            </Row>



            <Row form>
              <Col md={6} sm="12" md={{ size: 6, offset: 3 }}>
                
              <FormGroup>
                <Label for="exampleFile">Avatar</Label>
                    <Input onChange={this.changeHandler} type="file" name="avatar" id="exampleFile" value={this.state.avatar} />
                    <FormText color="muted">
                      Upload a picture to be used for your profile.
              </FormText>
              </FormGroup>
      
              </Col>
            </Row>


          
      

            <Row form>
              <Col md={6} sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input 
                    onChange={this.changeHandler} 
                    value={this.state.username} 
                    type="text" name="username" 
                    placeholder={this.props.user.username} />
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
                    placeholder="new password" />
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
                    placeholder="confirm new password" />
                    {this.state.confirmedPw ?
                      this.state.confirmedPw.length > 0 && this.state.disableSubmitButton === true ? 

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
            <Col md={6} sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup tag="fieldset">
                  Account Type: 
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
                  </Col>
    

            </Row>  
         
      
            <Button block color="primary" 
              disabled={this.state.disableSubmitButton} 
              onClick={this.formHandler}>
              Make Changes
            </Button>  &nbsp;
          </Form>
          </div>

            :
            
            <Redirect to="/login"/>
            }
            </>
        )
    }


}


export default Profile;