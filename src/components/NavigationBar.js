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
              <NavLink href="/my/classes">My Classes</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/profile">My Profile</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Dance Style
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Salsa
                </DropdownItem>
                <DropdownItem>
                  Bachata
                </DropdownItem>
                <DropdownItem>
                  Afro Cuban Folklore
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

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
                    <Button  id="userbutton" href="/login">Log In</Button>
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