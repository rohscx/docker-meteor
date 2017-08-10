import React from 'react';
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react'
import { Link } from 'react-router';
import {Navbar,Nav ,NavItem,NavDropdown,MenuItem} from 'react-bootstrap';

// style object for nav bar
const styleObj = {
  color: '#eee',
  textDecoration: 'none'
};
// active style object for nav bar
const activeStyleObj = {
  color: '#eee'
};
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
const styleDropDownObj = {
  color: 'black'
};
const MainLayout = ({children}) =>
  <div>
    <header>
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/' style={styleObj} activeStyle={activeStyleObj}>FROST</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}>
              <Link to='/apic' style={styleObj} activeStyle={activeStyleObj}> APIC-EM </Link>
            </NavItem>
            <NavItem eventKey={2}>
              <Link to='/ise' style={styleObj} activeStyle={activeStyleObj}> ISE </Link>
            </NavItem>
            <NavItem eventKey={3}>
            <Link to='/prtg' style={styleObj} activeStyle={activeStyleObj}> PRTG </Link>
            </NavItem>
            <NavDropdown eventKey={10} title="Util" id="basic-nav-dropdown">
              <MenuItem eventKey={10.1}>
                <Link to='/trfr'> TRANSF..RATE </Link>
              </MenuItem>
              <MenuItem eventKey={10.2}>Another action</MenuItem>
              <MenuItem eventKey={10.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={10.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1}>
              <LoginButtons/>
            </NavItem>
            <NavItem eventKey={2}>
              <Link to='/about' style={styleObj} activeStyle={activeStyleObj}> About </Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
    <div style={divStyles}>
      {children}
    </div>
  </div>


export default MainLayout;
