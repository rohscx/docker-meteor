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
          <Navbar.Brand href='/' to='/'>
            FROST
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} componentClass={Link} href='/apic' to='/apic'>
              APIC-EM
            </NavItem>
            <NavItem eventKey={2} componentClass={Link} href='/ise' to='/ise'>
              ISE
            </NavItem>
            <NavItem eventKey={3} componentClass={Link} href='/prtg' to='/prtg'>
              PRTG
            </NavItem>
            <NavDropdown eventKey={10} title="Util" id="basic-nav-dropdown">
              <MenuItem eventKey={10.1} componentClass={Link} href='/trfr' to='/trfr'>
                TRANSF..RATE
              </MenuItem>
              <MenuItem eventKey={10.2} >Another action</MenuItem>
              <MenuItem eventKey={10.3} >Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={10.3} >Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} >
              <LoginButtons/>
            </NavItem>
            <NavItem eventKey={2} componentClass={Link} href='/about' to='/about'>
              About
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
