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
import ManageClasses from './containers/ManageClasses'



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
    const token = localStorage.getItem("token")
    if (token) {
      fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`},
      })
      .then(resp => resp.json())
      .then(data => this.setState({ user: data.user}, this.setAccountType ))
      .catch((error) => {console.log(error)})
    }  else {
      console.log("not logged in")
    }

    this.getDanceClasses()
    this.getPurchasesAndCreatedClasses()  
  }

  setAccountType=()=>{
    if(this.state.user.account_type === "teacher"){
      this.setState({isTeacher: true}, ()=>console.log('this.state.isTeacher?', this.state.isTeacher) )
      this.props.history.push("/home/teacher")
    }else{
      this.setState({isTeacher: false}, ()=>console.log('state in set account type', this.state.isTeacher) )
      this.props.history.push("/home/student")
    }
  }

  patchUser=(userObj)=>{
    const newUserObj = {
      first_name: userObj.firstName, 
      last_name: userObj.lastName,
      password: userObj.password,
      account_type: userObj.accountType
    }
    console.log("user id from state", this.state.user.id)
    const token = localStorage.getItem("token")
    fetch(`http://localhost:3000/api/v1/users/${this.state.user.id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`},
      body: JSON.stringify({ user: newUserObj })
    })
    .then(resp => resp.json())
    // .then(resp => this.setState({user: user.data}))
    .catch((error) => {console.log(error)})
  }

  

  getPurchasesAndCreatedClasses=()=>{
    const token = localStorage.getItem("token")
    fetch('http://localhost:3000/me/dance_classes', {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`},
    })
    .then(resp => resp.json())
    .then(resp => this.setState({purchasedClasses: resp.purchased_dance_classes, createdClasses: resp.created_dance_classes}, this.setAccountType() ))
    .catch((error) => {console.log(error)})
  }

  getDanceClasses=()=>{
    fetch("http://localhost:3000/dance_classes")
    .then(resp => resp.json())
    .then(resp => this.setState({classes: resp.classes}, this.getPurchasesAndCreatedClasses() ))
  }


  signUpHandler=(userObj)=>{
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
      this.setState({ user: data.user }, () => this.getDanceClasses() )
    })
      
    }
  
  
  logOutHandler=()=>{
    localStorage.removeItem("token")
    this.setState({user:false})
    console.log(localStorage)
    this.props.history.push("/") 
  }

  logInHandler = (user) => {
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
        localStorage.setItem("token", data.jwt)
        this.setState({ user: data.user }, () => {

            if(this.state.user.account_type === "student"){
              this.props.history.push("/home/student")
            } else{this.props.history.push("/home/teacher")}

        })
      })
  }

  navBarHandler=(style)=>{
    this.setState({danceStyle: style })
  }

  manageIsTeacher=()=>{
    this.setState({isTeacher: !this.state.isTeacher}, 
      ()=> console.log("isTeacher in app", this.state.isTeacher)
      )
  }

  createClass=(classObj)=>{
    console.log("create class in app", classObj)
    const token = localStorage.getItem("token")
    fetch("http://localhost:3000/dance_classes", {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({dance_class: classObj})
    })
    .then(res => res.json())
    .then(console.log)
  }


  purchaseDanceClass=(danceClassId)=>{
    console.log("purchasing class")
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
        .then(data => {this.setState({purchasedClasses: [...this.state.purchasedClasses, data]}, ()=> this.componentDidMount()  )} )
    }

  render(){
    return (
      <>

       
        <Switch>
         

          <Route path="/login" render={() => 
                                            <div>
                                              <NavigationBar
                                                manageIsTeacher={this.manageIsTeacher} 
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
                                                manageIsTeacher={this.manageIsTeacher} 
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
                                                  manageIsTeacher={this.manageIsTeacher} 
                                                  isTeacher={this.state.isTeacher}
                                                  changeHandler={this.navBarHandler}
                                                  signUp={this.signUpHandler}
                                                  logIn={this.logInHandler} 
                                                  logOut={this.logOutHandler} 
                                                  user={this.state.user} />
                                                <JumboImage/>
                                                
                                                <CreateClass
                                                  createClass={this.createClass} 
                                                  user={this.state.user} 
                                                />
                                                </div>}/>


            <Route path="/me/created_classes" render={() =>
                                                  <>
                                                  <NavigationBar 
                                                  manageIsTeacher={this.manageIsTeacher} 
                                                  isTeacher={this.state.isTeacher}
                                                  changeHandler={this.navBarHandler}
                                                  signUp={this.signUpHandler}
                                                  logIn={this.logInHandler} 
                                                  logOut={this.logOutHandler} 
                                                  user={this.state.user} />
                                                <JumboImage/>
                                                <ManageClasses/>
                                                 </>}/>

            <Route path="/me/purchases" render={(data) => 
                                                    <div>
                                                      <NavigationBar 
                                                        manageIsTeacher={this.manageIsTeacher} 
                                                        isTeacher={this.state.isTeacher}
                                                        changeHandler={this.navBarHandler}
                                                        signUp={this.signUpHandler}
                                                        logIn={this.logInHandler} 
                                                        logOut={this.logOutHandler} 
                                                        user={this.state.user} />
                                                    <JumboImage/>
                                                      <PurchasesContainer 
                                                          user={this.state.user}
                                                          purchasedClasses={this.state.purchasedClasses} 
                                                          classes={this.state.classes}
                                                          />
                                                      </div> }/> 


            <Route path="/me" render={() => 
                                            <div>
                                            <NavigationBar 
                                              manageIsTeacher={this.manageIsTeacher} 
                                              isTeacher={this.state.isTeacher}
                                              changeHandler={this.navBarHandler}
                                              signUp={this.signUpHandler}
                                              logIn={this.logInHandler} 
                                              logOut={this.logOutHandler} 
                                              user={this.state.user} />
                                            <JumboImage/>
                                            <Profile 
                                              user={this.state.user} 
                                              editProfile={this.patchUser}
                                            />
                                            </div>}/>

            <Route path="/home/:dance_style/:id" render={(data) => 
                                              <div>
                                                <NavigationBar 
                                                  manageIsTeacher={this.manageIsTeacher} 
                                                  isTeacher={this.state.isTeacher}
                                                  changeHandler={this.navBarHandler}
                                                  signUp={this.signUpHandler}
                                                  logIn={this.logInHandler} 
                                                  logOut={this.logOutHandler} 
                                                  user={this.state.user} />
                                              <JumboImage/>
                                                <ClassShowPage
                                                      danceStyle={data.match.params.dance_style}
                                                      danceClassId={data.match.params.id} 
                                                      purchaseHandler={this.purchaseDanceClass}
                                                      classes={this.state.classes}/>
                                                </div> }/> 

            <Route path="/home/teacher" render={() => 
                                                  <div>
                                                    <NavigationBar 
                                                      manageIsTeacher={this.manageIsTeacher} 
                                                      isTeacher={this.state.isTeacher}
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
                                                      manageIsTeacher={this.manageIsTeacher} 
                                                      isTeacher={this.state.isTeacher}
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
                                                          manageIsTeacher={this.manageIsTeacher} 
                                                          isTeacher={this.state.isTeacher}
                                                          changeHandler={this.navBarHandler}
                                                          signUp={this.signUpHandler}
                                                          logIn={this.logInHandler} 
                                                          logOut={this.logOutHandler} 
                                                          user={this.state.user} />
                                                      <JumboImage/>
                                                        <ClassShowPage
                                                              purchaseHandler={this.purchaseDanceClass}
                                                              danceStyle={data.match.params.dance_style}
                                                              danceClassId={data.match.params.id} 
                                                              classes={this.state.classes}/>

                                                        </div> }/> 


              <Route path="/classes/:dance_style" render={(data) => 
                                            <div>
                                              <NavigationBar 
                                                manageIsTeacher={this.manageIsTeacher} 
                                                isTeacher={this.state.isTeacher}
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
                                                manageIsTeacher={this.manageIsTeacher} 
                                                isTeacher={this.state.isTeacher}
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
