import React from 'react'
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

  resetState=()=>{
    console.log("reset state")
  }

  render(){

    return(
      <>
    
      {localStorage.token ? 
      
              localStorage.isTeacher === "true"?               
                
                <Navbar color="light" light expand="md">
                    <NavLink onClick={this.resetState} className="navbar-brand" tag={Link} to="/">
                    <img src={require("./Logo.png")} width="70" height="70" alt="hi"></img></NavLink>
                    

                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                
                
                <Nav className="mr-auto" navbar>

                <NavItem>
                   <NavLink tag={Link} to="/classes/new">Create a Class</NavLink>
                </NavItem>
                <NavItem>
                   <NavLink tag={Link} to="/me/created_classes">Manage Your Classes</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={Link} to="/me">My Profile</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink onClick={this.manageIsTeacher} tag={Link} to="/home/student">Student Mode</NavLink>
                </NavItem>

                </Nav>


                <Nav className="ml-auto" navbar>

                <NavItem>
                    <Button onClick={this.props.logOut}>Log Out</Button>
                </NavItem>

                </Nav>
        
                </Collapse>
                </Navbar>

              :



              <Navbar color="light" light expand="md">
                    <NavLink className="navbar-brand" tag={Link} to="/">
                    <img src={require("./Logo.png")} width="70" height="70" alt="hi"></img></NavLink>

                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="mr-auto" navbar>

                <NavItem>
                  <NavLink tag={Link} to="/home/student">For You</NavLink>
               </NavItem>

                <NavItem>
                  <NavLink tag={Link} to="/me/purchases">My Purchases</NavLink>
              </NavItem>
                
              <NavItem>
                <NavLink tag={Link} to="/me">My Profile</NavLink>
              </NavItem>


              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Classes
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag={Link} to={"/classes/cubansalsa"}>
                    Cuban Salsa
                  </DropdownItem>
                  <DropdownItem tag={Link} to={"/classes/newyorksalsa"}>
                    New York Salsa
                  </DropdownItem>
                  <DropdownItem tag={Link} to={"/classes/bachata"}>
                    Bachata
                  </DropdownItem>
                  <DropdownItem tag={Link} to={"/classes/afrocubanfolklore"}>
                    Afro Cuban Folklore
                  </DropdownItem>
                  <DropdownItem tag={Link} to={"/classes/kizomba"}>
                    Kizomba
                  </DropdownItem>
                  <DropdownItem tag={Link} to={"/classes/zouk"}>
                    Zouk
                  </DropdownItem>
                </DropdownMenu>
                </UncontrolledDropdown>

             

                
                <NavItem>
                  <NavLink onClick={this.manageIsTeacher} tag={Link} to="/home/teacher">Teacher Mode</NavLink>
                </NavItem>

                </Nav>


                <Nav className="ml-auto" navbar>

                <NavItem>
                    <Button onClick={this.props.logOut}>Log Out</Button>
                </NavItem>


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
      
      

      }</>
      )}
 }

export default NavigationBar;