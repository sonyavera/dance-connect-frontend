import React, { useEffect, useState } from 'react';
import {
  Collapse,
  Button,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import '../App.css';
import { Link} from 'react-router-dom';
import {Logo} from './Logo.png'
import {Karelia} from './Karelia.png'
import {Malecon} from './Malecon.jpg'

class NavigationBar extends React.Component {
  

  state={
    isOpen: false
  }

  
  toggle=()=>{
    this.setState({isOpen: !this.state.isOpen})
  }


  manageIsTeacher=()=>{
    this.props.manageIsTeacher()
  }

  render(){

    return(
      <div>


      {this.props.user ? 
      
      <Navbar color="light" light expand="md">
      {this.props.user.account_type === "teacher" ?
      <a className="navbar-brand" href="/home/teacher">
      <img src={require("./Logo.png")} width="60" height="60" alt="hi"></img></a>
      :
      <a className="navbar-brand" href="/home/student">
          <img src={require("./Logo.png")} width="60" height="60" alt="hi"></img></a>
      }
        
        
        <NavbarToggler onClick={this.toggle}/>
        <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="mr-auto" navbar>
            {this.props.isTeacher === false ?
            <NavItem>
              <NavLink tag={Link} to="/home/student">For You</NavLink>
            </NavItem>
            :
            null}

            {this.props.isTeacher === true ?
            <>
            <NavItem>
              <NavLink tag={Link} to="/classes/new">Create a Class</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/me/created_classes">Manage Your Classes</NavLink>
            </NavItem>
            </>
            :
            null
            
            }
      
          
          {this.props.isTeacher === false ?
          <NavItem>
              <NavLink tag={Link} to="/me/purchases">My Purchases</NavLink>
            </NavItem>
          :
          null
          }


            <NavItem>
              <NavLink tag={Link} to="/me">My Profile</NavLink>
            </NavItem>

            {this.props.isTeacher === false ? 
            
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Classes
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} to={"/classes/cubansalsa"}>
                  Cuban Salsa
                </DropdownItem>
                <DropdownItem tag={Link} to={"/classes/bachata"}>
                  Bachata
                </DropdownItem>
                <DropdownItem tag={Link} to={"/classes/afrocubanfolklore"}>
                  Afro Cuban Folklore
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            :
            
            null
            }



            {this.props.isTeacher === false ?
            <NavItem>
              <NavLink onClick={this.manageIsTeacher} tag={Link} to="/home/teacher">Teacher Mode</NavLink>
            </NavItem>
            :
            <NavItem>
              <NavLink onClick={this.manageIsTeacher} tag={Link} to="/home/student">Student Mode</NavLink>
            </NavItem>
            } 
            </Nav>


            <Nav className="ml-auto" navbar>

            {localStorage.length > 0 ? 
                <NavItem>
                    <Button onClick={this.props.logOut}>Log Out</Button>
                </NavItem>

            :
                <>
                <NavItem className="justify-content-end">
                    <Button  href="/signup" id="signup" >Sign Up</Button>
                </NavItem>
             
                <NavItem className="nav-button">
                    <Button id="userbutton" href="/login">Log In</Button>
                </NavItem>
                </>
            }
            </Nav>
        
             </Collapse>
              </Navbar>
            :



            <Navbar color="light" light expand="md">
            <a className="navbar-brand" href="/">
            <img src={require("./Logo.png")} width="60" height="60" alt="hi"></img></a> 


                    

            <Nav className="ml-auto" navbar>
                <NavItem className="justify-content-end">
                    <Button  href="/signup" id="signup" >Sign Up</Button>
                </NavItem>
             
                <NavItem className="nav-button">
                    <Button id="userbutton" href="/login">Log In</Button>
                </NavItem>

            </Nav>
            </Navbar>  
      
      }

      </div>
      
    )
  }






  // console.log("state in navbar", accountType)

  // useEffect( ()=> {
  //   setAccountType(props.user.account_type)
  // })




  // const handleSelect=(e)=>{
  //   const classStyle = e.target.innerText
  //   props.changeHandler(classStyle)
  //   setDanceStyle(classStyle)
  // }

  // React.useEffect( ()=> {
  //   console.log("react.useEffect is working")
  // })

}

export default NavigationBar;