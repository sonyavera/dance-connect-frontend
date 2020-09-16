import React from 'react';
import logo from './logo.svg';
import { Button } from 'reactstrap';
import ReactDOM from 'react-dom';
import './App.css';


class App extends React.Component {

  
  componentDidMount{
    console.log("componentDidMount")
  }

  
  
  logOutHandler=()=>{
    localStorage.removeItem("token")
    this.props.history.push("/login") 
    this.setState({user:false})
  }

  logInHandler = () => { //ordinarily this function accepts userInfo as a parameter
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({first_name:"sonya", last_name: "gould", username: "sonyavera", account_type: "student"})
    })
      .then(res => res.json())
      .then(data => {
        console.log("response from backend after login", data)
        localStorage.setItem("token", data.jwt)
        this.setState({ user: data.user }, () => {this.componentDidMount()})
      })
      this.props.history.push("/")
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Button onClick={this.logInHandler}>Log In</Button>
        <Button onClick={this.logOutHandler}>Log Out</Button>
      </div>
    )
  }
  
}

export default App;
