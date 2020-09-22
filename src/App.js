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
    danceStyle: "Salsa",
    purchasedClasses: [],
    createdClasses: [],
    isTeacher: null
  }



  componentDidMount(){
    console.log("component did mount")
    const token = localStorage.getItem("token")
    if (token) {
      fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`},
      })
      .then(resp => resp.json())
      .then(data => this.setState({ user: data.user }, this.setAccountType ))
      .catch((error) => {console.log(error)})
    }  else {
      this.props.history.push("/login")
    }

    this.getDanceClasses()
    this.getPurchasesAndCreatedClasses()  
  }

  setAccountType=()=>{
    console.log("set account type")
    if(this.state.user.account_type === "teacher"){
      this.setState({isTeacher: true}, ()=>console.log('state in set account type', this.state.isTeacher) )
    }else{
      this.setState({isTeacher: false}, ()=>console.log('state in set account type', this.state.isTeacher) )
    }
  }



  getPurchasesAndCreatedClasses=()=>{
    const token = localStorage.getItem("token")
    fetch('http://localhost:3000/me/dance_classes', {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`},
    })
    .then(resp => resp.json())
    .then(resp => this.setState({purchasedClasses: resp.purchased_dance_classes, createdClasses: resp.created_dance_classes}))
    .catch((error) => {console.log(error)})
  }

  getDanceClasses=()=>{
    fetch("http://localhost:3000/dance_classes")
    .then(resp => resp.json())
    .then(resp => this.setState({classes: resp.classes}))
  }


  signUpHandler=(userObj)=>{
    console.log("signup handler")
    const userObject = {first_name: userObj.firstName, last_name: userObj.lastName, username: userObj.username, password:userObj.password, account_type:userObj.selectedOption}
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
    this.setState({danceStyle: style })
  }


  purchaseDanceClass=(danceClassId)=>{
    console.log("hit purchase handler")
    const userClassObj = {dance_class_id: danceClassId}
    const token = localStorage.getItem("token")
      fetch("http://localhost:3000/user_classes/", { 
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(userClassObj)
      })
        .then(res => res.json())
        .then(data => {this.setState({purchasedClasses: [...this.state.purchasedClasses, data]}, () => console.log("purchased classes", this.state.purchasedClasses))})
        .then(console.log('joined event'))
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

          <Route path="/classes/new" render={() => 
                                                <div>
                                                <NavigationBar 
                                                  changeHandler={this.navBarHandler}
                                                  signUp={this.signUpHandler}
                                                  logIn={this.logInHandler} 
                                                  logOut={this.logOutHandler} 
                                                  user={this.state.user} />
                                                <JumboImage/>
                                                create class
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
                                                          classes={this.state.purchasedClasses} 
                                                          />
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
                                                    <StudentUI
                                                        purchases={this.state.purchasedClasses} 
                                                        classes={this.state.classes}
                                                        purchaseHandler={this.purchaseDanceClass}
                                                    />
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
                                                    purchaseHandler={this.purchaseDanceClass}
                                                    danceStyle={data.match.params.dance_style} 
                                                    classes={this.state.classes}
                                                    purchases={this.state.purchasedClasses}
                                                    />
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
                                              <TeacherUI/>
                                                </div> } /> 



        </Switch>
        </>
    )
  }
  
}

export default withRouter(App);
