import React from 'react';
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
import Profile from './components/Profile'
import PurchasesContainer from './containers/PurchasesContainer'
import ClassShowPage from './containers/ClassShowPage'
import ManageClasses from './containers/ManageClasses'



class App extends React.Component {

  state ={
    user: null,
    avatar: null,
    classes: null,
    danceStyle: "Salsa",
    purchasedClasses: [],
    createdClasses: [],
    isTeacher: null,
    accountType: null
  }



  componentDidMount(){
    const token = localStorage.getItem("token")
    if (token) {
      fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`},
      })
      .then(resp => resp.json())
      // .then(console.log)
      .then(data => this.setState({ user: data.user, avatar: data.avatar}, ()=> this.setAccountType() ))
      .catch((error) => {console.log(error)})
    }  else {
      console.log("not logged in")
    }

    this.getDanceClasses()
    this.getPurchasesAndCreatedClasses() 

  }

  

  getPurchasesAndCreatedClasses=()=>{
    const token = localStorage.getItem("token")
    fetch('http://localhost:3000/me/dance_classes', {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`},
    })
    .then(resp => resp.json())
    .then(resp => this.setState({purchasedClasses: resp.purchased_dance_classes, 
                                  createdClasses: resp.created_dance_classes} ))
    .catch((error) => {console.log(error)})
  }

  getDanceClasses=()=>{
    fetch("http://localhost:3000/dance_classes")
    .then(resp => resp.json())
    .then(resp => this.setState({classes: resp.classes}))

        const token = localStorage.getItem("token")
    fetch('http://localhost:3000/me/dance_classes', {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`},
    })
    .then(resp => resp.json())
    .then(resp => this.setState({purchasedClasses: resp.purchased_dance_classes, 
                                createdClasses: resp.created_dance_classes} ))
    .catch((error) => {console.log(error)})
  }

  
  toggleMode=()=>{
    this.setState({isTeacher: !this.state.isTeacher})
  }
  
  setAccountType=()=>{
    if(this.state.user){
      console.log() 
    }
    if(this.state.user.account_type === "teacher"){
      this.setState({isTeacher: true, accountType: "teacher"} )
      // this.props.history.push("/home/teacher")
    }else{
      this.setState({isTeacher: false, accountType: "student"} )
      // this.props.history.push("/home/student")
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


  signUpHandler=(userObj)=>{
    
    const formData = new FormData()
    formData.append('first_name', userObj.firstName)
    formData.append('last_name', userObj.lastName)
    formData.append('username', userObj.username)
    formData.append('password', userObj.password)
    formData.append('account_type', userObj.selectedOption)
    formData.append('avatar', userObj.avatar)
    console.log("form data", formData)
    // const userObject = {
    //                     first_name: userObj.firstName, 
    //                     last_name: userObj.lastName, 
    //                     username: userObj.username, 
    //                     password:userObj.password, 
    //                     account_type:userObj.selectedOption, 
    //                     avatar: userObj.avatar
    // }
    console.log("user obj.avatar", userObj.avatar)
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      //   Accept: "application/json"
      // },
      // body: JSON.stringify({ user: userObject })
      body: formData 
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("token", data.jwt)
      this.setState({ user: data.user }, () => {
          console.log('user', this.state.user)
          if(this.state.user.account_type === "student"){
            this.props.history.push("/home/student")
          } else{this.props.history.push("/home/teacher")
        }
      }
      )
    })
  }
      


    // redirectAfterSignup=()=>{
    //   if(this.state.user.account_type === "teacher"){
    //     console.log("is teacher")
    //     this.props.history.push("/home/teacher")
    //   }else{
    //   console.log("is student")
    //   this.props.history.push("/home/student")
    // }
    // }
  
  
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
        this.setState({ user: data.user }
          , () => {

            if(localStorage.token === "undefined"){
              alert("Hello! I am an alert box!!")
              // this.props.history.push("/login")
            }else if(this.state.user.account_type === "student"){
              this.props.history.push("/home/student")
            }else if(this.state.user.acount_type==="teacher"){
              this.props.history.push("/home/teacher")
        }  
      })
    })
  }

  navBarHandler=(style)=>{
    this.setState({danceStyle: style })
  }

  manageIsTeacher=()=>{
    this.setState({isTeacher: !this.state.isTeacher})
  }

  createClass=(classObj)=>{
    if(classObj.style === "Bachata"){
      classObj.style = "bachata"
    }else if(classObj.style === "Zouk"){
      classObj.style = "zouk"
    }else if(classObj.style === "Afro Cuban Folklore"){
      classObj.style = "afrocubanfolklore"
    }else if(classObj.style === "Cuban Salsa"){
      classObj.style = "cubansalsa"
    }else if(classObj.style === "New York Salsa"){
      classObj.style = "newyorksalsa"
    }else if(classObj.style === "Kizomba"){
      classObj.style = "kizomba"
    }
    classObj.instructor_avatar = this.state.avatar
    console.log("class Obj", classObj)
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


  purchaseDanceClass=(danceClassObj)=>{
    console.log("dance class obj", danceClassObj)
    const userClassObj = {dance_class_id: danceClassObj.id}
    console.log("user class obj", userClassObj)
    // console.log("purchasing", "user class obj", userClassObj, "dance class obj", danceClassObj)
    const token = localStorage.getItem("token")
      fetch("http://localhost:3000/user_classes/", { 
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({user_class: userClassObj})
      })
        .then(res => res.json())
        .then(data => {this.setState({purchasedClasses: [...this.state.purchasedClasses, data]}, ()=> console.log('purchased classes', this.state.purchasedClasses) )} )
        .then(()=> this.getPurchasesAndCreatedClasses())
        // .then(()=> this.getDanceClasses())
    }

  //   componentDidUpdate=(prevProps, prevState)=>{
  //     if(this.state.purchasedClasses !== prevState.purchasedClasses){
  //         this.getPurchasesAndCreatedClasses()       
  //     }
  // }




  render(){
    console.log('is teacher', this.state.isTeacher)
    return (
      <>

       
        <Switch>
         

          <Route path="/login" render={() => 
                                            <div>
                                              <NavigationBar
                                                accountType={this.state.accountType}
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
                                               accountType={this.state.accountType}
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
                                                  accountType={this.state.accountType}
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
            
    <Route path="/me/purchases/:id" render={(data) => 
                                            <div>
                                            <NavigationBar 
                                              accountType={this.state.accountType}
                                              manageIsTeacher={this.manageIsTeacher} 
                                              isTeacher={this.state.isTeacher}
                                              changeHandler={this.navBarHandler}
                                              signUp={this.signUpHandler}
                                              logIn={this.logInHandler} 
                                              logOut={this.logOutHandler} 
                                              user={this.state.user} />
                                            <JumboImage/>
                                            <ClassShowPage
                                                      // danceStyle={data.match.params.dance_style}
                                                      danceClassId={data.match.params.id} 
                                                      purchaseHandler={this.purchaseDanceClass}
                                                      purchases={this.state.purchasedClasses}
                                                      classes={this.state.classes}
                                            />
                                            </div>}/>


            <Route path="/me/created_classes" render={() =>
                                                  <>
                                                  <NavigationBar 
                                                  accountType={this.state.accountType}
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
                                                        accountType={this.state.accountType}
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
                                              accountType={this.state.accountType}
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
                                              avatar={this.state.avatar}
                                              editProfile={this.patchUser}
                                            />
                                            </div>}/>

            <Route path="/home/:dance_style/:id" render={(data) => 
                                              <div>
                                                <NavigationBar 
                                                  accountType={this.state.accountType}
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
                                                      purchases={this.state.purchasedClasses}
                                                      classes={this.state.classes}/>
                                                </div> }/> 

            <Route path="/home/teacher" render={() => 
                                                  <div>
                                                    <NavigationBar 
                                                      accountType={this.state.accountType}
                                                      manageIsTeacher={this.manageIsTeacher} 
                                                      isTeacher={this.state.isTeacher}
                                                      changeHandler={this.navBarHandler}
                                                      signUp={this.signUpHandler}
                                                      logIn={this.logInHandler} 
                                                      logOut={this.logOutHandler} 
                                                      user={this.state.user} />
                                                  <JumboImage/>
                                                    <TeacherUI toggleMode={this.toggleMode}/>
                                                    </div> }/> 

      
              <Route path="/home/student" render={() => 
                                                  <div>
                                                    <NavigationBar
                                                      accountType={this.state.accountType} 
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
                                                          accountType={this.state.accountType}
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
                                                              purchases={this.state.purchasedClasses} 
                                                              classes={this.state.classes}/>

                                                        </div> }/> 


              <Route path="/classes/:dance_style" render={(data) => 
                                            <div>
                                              <NavigationBar 
                                                accountType={this.state.accountType}
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
                                                accountType={this.state.accountType}
                                                manageIsTeacher={this.manageIsTeacher} 
                                                isTeacher={this.state.isTeacher}
                                                changeHandler={this.navBarHandler}
                                                signUp={this.signUpHandler}
                                                logIn={this.logInHandler} 
                                                logOut={this.logOutHandler} 
                                                user={this.state.user} />
                                            <JumboImage/>
                                              <Home
                                                classes={this.state.classes}
                                              />
                                                </div> } /> 



        </Switch>
        </>
    )
  }
  
}

export default withRouter(App);
