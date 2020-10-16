import React from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {Redirect} from 'react-router-dom'
import '../App.css';
import { Link } from 'react-router-dom'


class Profile extends React.Component{

    state = {
        firstName: null,
        lastName: null,
        accountType: null,
        username: null,
        password: null,
        avatar: null,
        avatarBinary: null,
        confirmedPw: null,
        selectedOption: null,
        disableSubmitButton: true
    }

    componentDidMount(){
      if(localStorage.accountType === "student"){
        this.setState({selectedOption: "student"})
      }else{
        this.setState({selectedOption: "teacher"})
      }
    }


    formHandler=()=>{
        this.props.editProfile(this.state)
    }

    avatarChangeHandler=(e)=>{
      this.setState({avatar: e.target.files[0]}, ()=> {
        console.log("this.state.avatar", this.state.avatar)
        const read = new FileReader();
        read.readAsBinaryString(this.state.avatar)
        const self = this
        read.onloadend = function(){
          self.setState({avatarBinary: read.result})
          // console.log(read.result);
      }
      })
    }

    hexToBase64 =(str) => {
        return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
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
            {localStorage.token && this.props.user ?

              <div className="form-div">
               <Form className="inner-form">
               <center><strong>Edit Your Profile</strong></center>
               {/* {this.state.avatarBinary ?
               <img id="prof-page-avatar" src={'data:image/jpeg;base64,' + this.hexToBase64(this.state.avatarBinary)} alt=''/>
               :
               <img id="prof-page-avatar" src={this.props.avatar} alt=''/>
               } */}
               <img id="prof-page-avatar" src={this.props.avatar} alt=''/>
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
                <Label for="exampleFile"></Label>
                    <Input onChange={this.avatarChangeHandler} type="file" name="avatar" id="exampleFile" />
                    {/* <Input onChange={this.avatarChangeHandler} type="file" name="avatar" id="exampleFile" value={this.props.avatar} /> */}

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
                    value={this.state.password} 
                    type="password" 
                    name="password" 
                    placeholder="confirm or change pw" />
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
         
      
            <Button 
              tag={Link} to="/"
              block color="primary" 
              disabled={this.state.disableSubmitButton} 
              onClick={this.formHandler}>
              Make Changes
            </Button>  &nbsp;
          </Form>
          </div>

            :
            
            <h1>Loading...</h1>
            }
            </>
        )
    }


}


export default Profile;