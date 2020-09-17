import React from 'react';
import logo from './logo.svg';
import { Button } from 'reactstrap';
import ReactDOM from 'react-dom';
import './App.css';
import {  
  Switch,
  Route,
  withRouter } from 'react-router-dom';
import Login from './components/Login'
import SignUp from './components/SignUp'
import CreateClass from './components/CreateClass'
import Navbar from './components/Navbar'
import Home from './containers/Home'
import TeacherUI from './containers/TeacherUI'
import StudentUI from './containers/StudentUI'




class App extends React.Component {

  state ={
    user: null
  }

  
  componentDidMount(){
    console.log("componentDidMount", "this.state.user", this.state.user)
  }


  signUpHandler=()=>{
    console.log("signup handler")
    const userObj = {first_name:"sonya", last_name:"gould", username: "svg145", password:"test", account_type:"student"}
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ user: userObj })
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("token", data.jwt)
      this.setState({ user: data.user }, () => {this.componentDidMount()})
      
    })
    // this.props.history.push("/")
  }
  
  
  logOutHandler=()=>{
    localStorage.removeItem("token")
    // this.props.history.push("/login") 
    this.setState({user:false})
    console.log(localStorage)
  }

  logInHandler = () => { //ordinarily this function accepts userInfo as a parameter
    const user = {username: "svg145", password:"test"}
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({user})
    })
      .then(res => res.json())
      .then(data => {
        console.log("response from backend after login", data)
        localStorage.setItem("token", data.jwt)
        this.setState({ user: data.user }, () => {this.componentDidMount()})
      })
      // this.props.history.push("/")
  }
  render(){
    return (
      <>
      <Button onClick={this.logInHandler}>Log In</Button>
        <Button onClick={this.logOutHandler}>Log Out</Button>
        <Button onClick={this.signUpHandler}>Sign Up</Button>
        


       
        <Switch>
         

          <Route path="/login" render={() => 
                                            <div>
                                              <Login user={this.state} logInHandler={this.logInHandler} />
                                            </div>} />

          <Route path="/signup" render={() => 
                                            <div>
                                              <SignUp signUpHandler={this.signupHandler}/>
                                            </div>} />

          <Route path="/createclass" render={() => 
                                                    <div>
                                                    <Navbar user={this.state.user} />
                                                    <CreateClass 
                                                    user={this.state.user} 
                                                    />
                                                    </div>}/>



          {/* I think because it's all one container it may not be trigger correct refreshing of the page. Tested and verified  */}
          {/* <Route path='/classes/:id' render={() => 
                                                <div>
                                                <Navbar user={this.state.user} />
                                                <ClassShowPage 
                                                  data={this.state.events}
                                                  user={this.state.user} 
                                                  joinEvent={this.newUserEvent}
                                                  joinedEvents={this.state.joinedEvents}
                                                  deleteUserEvent={this.deleteUserEvent}
                                                />
                                                
                                                </div>}  /> */}

      <Route path="/home/teacher" render={() => 
                              <div>
                                <Navbar user={this.state.user} />
                                <TeacherUI/>
                
                
                                </div> }
          /> 

      
        <Route path="/home/student" render={() => 
                              <div>
                                <Navbar user={this.state.user} />
                                <StudentUI/>
                
                
                                </div> }
          /> 
      
          

          <Route path="/" render={() => 
                                    <div>
                                      <Navbar user={this.state.user} />
                                      <Home/>
                                      
                                      
                                    </div> }
          /> 



        </Switch>
        </>
    )
  }
  
}

export default withRouter(App);
