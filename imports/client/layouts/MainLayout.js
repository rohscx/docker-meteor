import React from 'react';
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react'
import { Link } from 'react-router';
import {Navbar,Nav ,NavItem,NavDropdown,MenuItem} from 'react-bootstrap';

// style object for nav bar
const styleObj = {
  textDecoration: 'none',
  color: '#9d9d9d'
};
// active style object for nav bar
const activeStyleObj = {
  color: '#9d9d9d'
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
            <NavItem eventKey={1} componentClass="span">
              <Link to='/apic' style={styleObj} activeStyle={activeStyleObj}> APIC-EM </Link>
            </NavItem>
            <NavItem eventKey={2} componentClass="span">
              <Link to='/ise' style={styleObj} activeStyle={activeStyleObj}> ISE </Link>
            </NavItem>
            <NavItem eventKey={3} componentClass="span">
            <Link to='/prtg' style={styleObj} activeStyle={activeStyleObj}> PRTG </Link>
            </NavItem>
            <NavDropdown eventKey={10} title="Util" id="basic-nav-dropdown">
              <MenuItem eventKey={10.1}>
                <Link to='/trfr' style={styleObj} activeStyle={activeStyleObj}> TRANSF..RATE </Link>
              </MenuItem>
              <MenuItem eventKey={10.2} componentClass="span">Another action</MenuItem>
              <MenuItem eventKey={10.3} componentClass="span">Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={10.3} componentClass="span">Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} componentClass="span">
              <LoginButtons/>
            </NavItem>
            <NavItem eventKey={2} componentClass="span">
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
