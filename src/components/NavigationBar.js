import React, { useState } from 'react';
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

const NavigationBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Student Home</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/me/classes">My Purchases</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/me">My Profile</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                All Classes
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/classes/salsa">
                  Salsa
                </DropdownItem>
                <DropdownItem href="/classes/bachata">
                  Bachata
                </DropdownItem>
                <DropdownItem href="/classes/folklore">
                  Afro Cuban Folklore
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            </Nav>

            <Nav className="ml-auto" navbar>

            {localStorage.length > 0 ? 
                <NavItem>
                    <Button onClick={props.logOut}>Log Out</Button>
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
    </div>
  );
}

export default NavigationBar;