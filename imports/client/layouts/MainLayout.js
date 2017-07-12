import React from 'react';
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react'
import { Link } from 'react-router';
import { Button, Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


// style object for nav bar
const styleObj = {
  color: '#eee',
  textDecoration: 'none'
};
// active style object for nav bar
const activeStyleObj = {
  color: '#eee'
};

// stateless functional component. Functuion returns what ever you like
const MainLayout = ({children}) =>

  <div className='main-layout'>
    <header>
      <h1><Link to='/' style={styleObj} activeStyle={activeStyleObj}>FROST</Link></h1>
      <LoginButtons/>
      <nav>
        <Link to='/apic' style={styleObj} activeStyle={activeStyleObj}>APIC-EM</Link> |
        <Link to='/ise' style={styleObj} activeStyle={activeStyleObj}>ISE</Link> |
        <Link to='/about' style={styleObj} activeStyle={activeStyleObj}>About</Link>

      </nav>
      <Nav pullRight>
<LoginButtons/>
</Nav>
    </header>
    {children}
  </div>

export default MainLayout;
