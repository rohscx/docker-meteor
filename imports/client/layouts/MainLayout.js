import React from 'react';
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react'
import { Link } from 'react-router';
import {Navbar,Nav,NavItem,NavDropdown, MenuItem, Header} from 'react-bootstrap';


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
<nav className="navbar navbar-inverse">
  <div className="container-fluid">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <NavBrand linkTo={this.props.brand.linkTo} text={this.props.brand.text} />
    </div>
    <div className="collapse navbar-collapse" id="navbar-collapse">
      <NavMenu links={this.props.links} />
    </div>
  </div>
</nav>


export default MainLayout;
