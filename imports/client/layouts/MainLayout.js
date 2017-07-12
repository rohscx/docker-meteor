import React from 'react';
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react'
import { Link } from 'react-router';
import {Navbar,Nav,NavItem,NavDropdown, MenuItem} from 'react-bootstrap';


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
<div className='main-layout'>
  <header>
    <h1><Link to='/'>FROST</Link></h1>
    <LoginButtons/>
    <nav>
      <Link to='/apic'>APIC-EM</Link> |
      <Link to='/ise'>ISE</Link> |
      <Link to='/about'>About</Link>

    </nav>
  </header>

</div>
*/

// stateless functional component. Functuion returns what ever you like
const MainLayout = ({children}) =>
<div>
  <Navbar inverse collapseOnSelect>
   <Navbar.Header>
     <Navbar.Brand>
       <a href="/">FROST</a>
     </Navbar.Brand>
     <Navbar.Toggle />
   </Navbar.Header>
   <Navbar.Collapse>
     <Nav>
       <NavItem eventKey={1} href="/apic">APIC-EM</NavItem>
       <NavItem eventKey={2} href="/ise">ISE</NavItem>
       <NavItem eventKey={3} href="/about">about</NavItem>
       <NavDropdown eventKey={6} title="Util" id="basic-nav-dropdown">
         <MenuItem eventKey={6.1}>Action</MenuItem>
         <MenuItem eventKey={6.2}>Another action</MenuItem>
         <MenuItem eventKey={6.3}>Something else here</MenuItem>
         <MenuItem divider />
         <MenuItem eventKey={6.3}>Separated link</MenuItem>
       </NavDropdown>
     </Nav>
     <Nav pullRight>
       <NavItem eventKey={1} ><LoginButtons/></NavItem>
       <NavItem eventKey={2} href="#">Link Right</NavItem>
     </Nav>
   </Navbar.Collapse>
  </Navbar>
  {children}
</div>


export default MainLayout;
