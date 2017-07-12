import React from 'react';
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react'
import { Link } from 'react-router';
import {DropdownButton, MenuItem} from 'react-bootstrap';


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
  <nav className="navbar navbar-inverse navbar-fixed-top">
    <div className="container-fluid">
      <div className="navbar-header">
          <button type="button" className="navbar-toggle">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
        </button>
        <Link to='/' className="navbar-brand">FROST</Link>
      </div>
      <div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav">
            <li><Link to='/apic'>APIC-EM</Link></li>
            <li><Link to='/ise'>ISE</Link></li>
            <li><Link to='/about'>About</Link></li>
            <DropdownButton title="Dropdown">
  <MenuItem href="#books">Books</MenuItem>
  <MenuItem href="#podcasts">Podcasts</MenuItem>
  <MenuItem href="#">Tech I Like</MenuItem>
  <MenuItem href="#">About me</MenuItem>
  <MenuItem href="#addBlog">Add a Blog</MenuItem>
</DropdownButton>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <div>
    {children}
  </div>
</div>


export default MainLayout;
