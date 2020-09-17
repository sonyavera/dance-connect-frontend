import React from 'react';
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
import NavigationBar from './components/NavigationBar'
import Home from './containers/Home'
import TeacherUI from './containers/TeacherUI'
import StudentUI from './containers/StudentUI'
import JumboImage from './components/JumboImage'



class App extends React.Component {

  state ={
    user: null
  }

  
  componentDidMount(){
    fetch("http://localhost:3000/dance_classes")
    .then(resp => resp.json())
    .then(console.log)
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
    this.props.history.push("/")
  }
  
  
  logOutHandler=()=>{
    localStorage.removeItem("token")
    this.setState({user:false})
    console.log(localStorage)
    this.props.history.push("/login") 
  }

  logInHandler = (loginInfo) => { //ordinarily this function accepts userInfo as a parameter
    console.log("logging in")
    const user = loginInfo
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
        this.setState({ user: data.user }, () => {
            if(this.state.user.account_type === "student"){
              console.log('true')
              this.props.history.push("/home/student")
            } else{this.props.history.push("/home/teacher")}
        })
      })
  }

  render(){
    return (
      <>


        


       
        <Switch>
         

          <Route path="/login" render={() => 
                                            <div>
                                              <NavigationBar 
                                                signUp={this.signUpHandler}
                                                logIn={this.logInHandler} 
                                                logOut={this.logOutHandler} 
                                                user={this.state.user} />
                                              <JumboImage/>
                                              <Login 
                                                user={this.state} 
                                                logIn={this.logInHandler} />
                                            </div>} />

          <Route path="/signup" render={() => 
                                            <div>
                                              <NavigationBar 
                                                signUp={this.signUpHandler}
                                                logIn={this.logInHandler} 
                                                logOut={this.logOutHandler} 
                                                user={this.state.user} />
                                              <JumboImage/>
                                              <SignUp 
                                                signUpHandler={this.signupHandler}/>
                                            </div>} />

          <Route path="/createclass" render={() => 
                                                <div>
                                                <NavigationBar 
                                                  signUp={this.signUpHandler}
                                                  logIn={this.logInHandler} 
                                                  logOut={this.logOutHandler} 
                                                  user={this.state.user} />
                                                <JumboImage/>
                                                <CreateClass 
                                                  user={this.state.user} 
                                                />
                                                </div>}/>


      <Route path="/home/teacher" render={() => 
                                            <div>
                                              <NavigationBar 
                                                signUp={this.signUpHandler}
                                                logIn={this.logInHandler} 
                                                logOut={this.logOutHandler} 
                                                user={this.state.user} />
                                            <JumboImage/>
                                              <TeacherUI/>
                                              </div> }/> 

      
        <Route path="/home/student" render={() => 
                                            <div>
                                              <NavigationBar 
                                                signUp={this.signUpHandler}
                                                logIn={this.logInHandler} 
                                                logOut={this.logOutHandler} 
                                                user={this.state.user} />
                                            <JumboImage/>
                                              <StudentUI/>
                                              </div> }/> 
      
          

          <Route path="/" render={() => 
                                        <div>
                                          <NavigationBar 
                                            signUp={this.signUpHandler}
                                            logIn={this.logInHandler} 
                                            logOut={this.logOutHandler} 
                                            user={this.state.user} />
                                        <JumboImage/>
                                          <Home/>
                                            </div> } /> 



        </Switch>
        </>
    )
  }
  
}

export default withRouter(App);
