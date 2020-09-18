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
import ClassesContainer from './containers/ClassesContainer'
import FeaturedClasses from './containers/FeaturedClasses'
import Recommendations from './containers/Recommendations'
import Profile from './components/Profile'
import PurchasesContainer from './containers/PurchasesContainer'
import ClassShowPage from './containers/ClassShowPage'



class App extends React.Component {

  state ={
    user: null,
    classes: null,
    danceStyle: "Salsa"
  }

  
  componentDidMount(){
    fetch("http://localhost:3000/dance_classes")
    .then(resp => resp.json())
    // .then(resp => console.log(resp.classes))
    .then(resp => this.setState({classes: resp.classes}, ()=> console.log(this.state.classes) ))
  }


  signUpHandler=(userObj)=>{
    console.log("signup handler")
    const userObject = {first_name: userObj.firstName, last_name: userObj.lastName, username: userObj.username, password:userObj.password, account_type:"student"}
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ user: userObject })
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

  logInHandler = (user) => { //ordinarily this function accepts userInfo as a parameter
    console.log("logging in")
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

  navBarHandler=(style)=>{
    this.setState({danceStyle: style }, ()=>console.log("state dance style", this.state.danceStyle))
  }

  render(){
    return (
      <>


        


       
        <Switch>
         

          <Route path="/login" render={() => 
                                            <div>
                                              <NavigationBar 
                                                changeHandler={this.navBarHandler}
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
                                                changeHandler={this.navBarHandler}
                                                signUp={this.signUpHandler}
                                                logIn={this.logInHandler} 
                                                logOut={this.logOutHandler} 
                                                user={this.state.user} />
                                              <JumboImage/>
                                              <SignUp 
                                                signUp={this.signUpHandler}/>
                                            </div>} />

          <Route path="/createclass" render={() => 
                                                <div>
                                                <NavigationBar 
                                                  changeHandler={this.navBarHandler}
                                                  signUp={this.signUpHandler}
                                                  logIn={this.logInHandler} 
                                                  logOut={this.logOutHandler} 
                                                  user={this.state.user} />
                                                <JumboImage/>
                                                <CreateClass 
                                                  user={this.state.user} 
                                                />
                                                </div>}/>

            <Route path="/me/purchases" render={(data) => 
                                                    <div>
                                                      <NavigationBar 
                                                        changeHandler={this.navBarHandler}
                                                        signUp={this.signUpHandler}
                                                        logIn={this.logInHandler} 
                                                        logOut={this.logOutHandler} 
                                                        user={this.state.user} />
                                                    <JumboImage/>
                                                      <PurchasesContainer 
                                                          classes={this.state.classes} 
                                                          />
                                                      <FeaturedClasses/>
                                                      <Recommendations/>
                                                      </div> }/> 


            <Route path="/me" render={() => 
                                            <div>
                                            <NavigationBar 
                                              changeHandler={this.navBarHandler}
                                              signUp={this.signUpHandler}
                                              logIn={this.logInHandler} 
                                              logOut={this.logOutHandler} 
                                              user={this.state.user} />
                                            <JumboImage/>
                                            <Profile 
                                              user={this.state.user} 
                                            />
                                            </div>}/>

            <Route path="/home/teacher" render={() => 
                                                  <div>
                                                    <NavigationBar 
                                                      changeHandler={this.navBarHandler}
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
                                                      changeHandler={this.navBarHandler}
                                                      signUp={this.signUpHandler}
                                                      logIn={this.logInHandler} 
                                                      logOut={this.logOutHandler} 
                                                      user={this.state.user} />
                                                  <JumboImage/>
                                                    <StudentUI/>
                                                    </div> }/> 

        
                <Route path="/classes/:dance_style/:id" render={(data) => 
                                                      <div>
                                                        <NavigationBar 
                                                          changeHandler={this.navBarHandler}
                                                          signUp={this.signUpHandler}
                                                          logIn={this.logInHandler} 
                                                          logOut={this.logOutHandler} 
                                                          user={this.state.user} />
                                                      <JumboImage/>
                                                        <ClassShowPage
                                                              danceStyle={data.match.params.dance_style}
                                                              classId={data.match.params.id} 
                                                              classes={this.state.classes}/>
                                                        </div> }/> 


              <Route path="/classes/:dance_style" render={(data) => 
                                            <div>
                                              <NavigationBar 
                                                changeHandler={this.navBarHandler}
                                                signUp={this.signUpHandler}
                                                logIn={this.logInHandler} 
                                                logOut={this.logOutHandler} 
                                                user={this.state.user} />
                                            <JumboImage/>
                                              <ClassesContainer 
                                                    danceStyle={data.match.params.dance_style} 
                                                    classes={this.state.classes}/>
                                              </div> }/> 


                    
          

              <Route path="/" render={() => 
                                            <div>
                                              <NavigationBar 
                                                changeHandler={this.navBarHandler}
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
