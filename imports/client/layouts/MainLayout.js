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
    <h1><Link to='/' >FROST</Link></h1>
    <LoginButtons/>
    <nav>
      <Link to='/apic' >APIC-EM</Link> |
      <Link to='/ise' >ISE</Link> |
      <Link to='/about' s>About</Link>

    </nav>
  </header>

</div>
*/

// stateless functional component. Functuion returns what ever you like
const MainLayout = ({children}) =>
<div>
  <body dataSpy="scroll" dataTarget=".navbar" dataOffset="50">

  <nav className="navbar navbar-inverse navbar-fixed-top">
    <div className="container-fluid">
      <div className="navbar-header">
          <button type="button" className="navbar-toggle" dataToggle="collapse" dataTarget="#myNavbar">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand">Frost</a>
      </div>
      <div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav">
            <li><a>Section 1</a></li>
            <li><a>Section 2</a></li>
            <li><a>Section 3</a></li>
            <li className="dropdown"><a className="dropdown-toggle" dataToggle="dropdown">Section 4 <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a>Section 4-1</a></li>
                <li><a>Section 4-2</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  {children}
</body>
</div>


export default MainLayout;
