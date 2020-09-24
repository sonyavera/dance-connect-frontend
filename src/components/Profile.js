import React from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Input, NavLink } from 'reactstrap';
import {Redirect} from 'react-router-dom'
import '../App.css';


class Profile extends React.Component{

    state = {
        firstName: null,
        lastName: null,
        accountType: null,
        username: null,
        password: null,
        confirmedPw: null,
        selectedOption: null,
    }


    formHandler=()=>{
        this.props.editProfile(this.state)
    }

    changeHandler=(e)=>{
        this.setState({ [e.target.name]: e.target.value})
    }

    handleOptionChange=(changeEvent)=>{
      this.setState({
        selectedOption: changeEvent.target.value
      });
    }

    render(){
        console.log('props in profile', this.props)


        return(
            <>
            {this.props.user ?

              <div className="form-div">
               <Form className="inner-form">
               <center>Edit Your Profile</center>
               &nbsp;
              <Row form>
              <Col md={6}>
                <FormGroup>
                  <Input onChange={this.changeHandler} value={this.state.firstName} type="text" name="firstName" placeholder={this.props.user.first_name}/>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Input onChange={this.changeHandler} value={this.state.lastName} type="text" name="lastName"  placeholder={this.props.user.last_name}/>
                </FormGroup>
              </Col>
            </Row>
      

            <Row form>
              <Col md={6} sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input onChange={this.changeHandler} value={this.state.username} type="text" name="username" placeholder={this.props.user.username} />
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={6} sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input onChange={this.changeHandler} value={this.state.password} type="text" name="password" id="exampleEmail" placeholder="new password" />
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={6} sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <Input onChange={this.changeHandler} value={this.state.confirmedPw} type="text" name="confirmedPw" placeholder="confirm new password" />
                </FormGroup>
              </Col>
            </Row>

            <Row form>
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
    

            </Row>  
         
      
            <Button block color="primary" onClick={this.formHandler}>Make Changes</Button> &nbsp;
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