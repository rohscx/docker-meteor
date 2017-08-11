import React from 'react';
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react'
import { Link } from 'react-router';
import {Navbar,Nav ,NavItem,NavDropdown,MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';


/*
// stateless functional component. Functuion returns what ever you like

const MainLayout = ({children}) =>
  <div className='main-layout'>
    <header>
      <h1><Link to='/' style={styleObj} activeStyle={activeStyleObj}>FROST</Link></h1>
      <LoginButtons/>
      <nav>
        <Link to='/apic' style={styleObj} activeStyle={activeStyleObj}> APIC-EM </Link>
        <Link to='/ise' style={styleObj} activeStyle={activeStyleObj}> ISE </Link>
        <Link to='/prtg' style={styleObj} activeStyle={activeStyleObj}> PRTG </Link>
        <Link to='/trfr' style={styleObj} activeStyle={activeStyleObj}> TRANSF..RATE </Link>
        <Link to='/about' style={styleObj} activeStyle={activeStyleObj}> About </Link>

      </nav>
    </header>
    {children}
  </div>
*/


const divStyles = {
  margin: "auto",
  width: "60%"
};

const MainLayout = ({children}) =>
  <div>
    <header>
      <LinkContainer to='/'>
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            FROST
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to='/apic'>
              <NavItem eventKey={1}>
                APIC-EM
              </NavItem>
            </LinkContainer>
            <LinkContainer to='/ise'>
            <NavItem eventKey={2}>
              ISE
            </NavItem>
            </LinkContainer>
            <LinkContainer to='/prtg'>
            <NavItem eventKey={3}>
              PRTG
            </NavItem>
            </LinkContainer>
            <NavDropdown eventKey={10} title="Utilities" id="basic-nav-dropdown">
              <LinkContainer to='/trfr'>
                <MenuItem eventKey={10.1}>TRANSF..RATE</MenuItem>
              </LinkContainer>
              <MenuItem eventKey={10.2}>Another action</MenuItem>
              <MenuItem eventKey={10.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={10.3} >Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} >
              <LoginButtons/>
            </NavItem>
            <LinkContainer to='/about'>
            <NavItem eventKey={2}>
              About
            </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </LinkContainer>
    </header>
    <div style={divStyles}>
      {children}
    </div>
  </div>


export default MainLayout;
