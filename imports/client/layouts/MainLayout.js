import React from 'react';
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react'
import { Link } from 'react-router';


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
      <Link to='/apic' style={styleObj} activeStyle={activeStyleObj}>APIC-EM</Link> |
      <Link to='/ise' style={styleObj} activeStyle={activeStyleObj}>ISE</Link> |
      <Link to='/about' style={styleObj} activeStyle={activeStyleObj}>About</Link>

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
          <button type="button" className="navbar-toggle" dataToggle="collapse" dataTarget="#myNavbar">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
        </button>
        <Link to='/'><a className="navbar-brand">FROST</a></Link>
      </div>
      <div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav">
            <li><a href="#section1">Section 1</a></li>
            <li><a href="#section2">Section 2</a></li>
            <li><a href="#section3">Section 3</a></li>
            <li className="dropdown"><a className="dropdown-toggle" dataToggle="dropdown" href="#">Section 4 <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="#section41">Section 4-1</a></li>
                <li><a href="#section42">Section 4-2</a></li>
              </ul>
            </li>
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
