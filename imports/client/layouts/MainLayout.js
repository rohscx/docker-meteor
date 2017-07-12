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
        <a className="navbar-brand"><Link to='/'>FROST</Link></a>
      </div>
      <div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav">
            <li><a><Link to='/apic' >APIC-EM</Link></a></li>
            <li><a><Link to='/ise' >ISE</Link></a></li>
            <li><a><Link to='/about' s>About</Link></a></li>
            <li className="dropdown"><a className="dropdown-toggle" dataToggle="dropdown" href="#">Tools<span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a><Link to='/about' s>About1</Link></a></li>
                <li><a><Link to='/about' s>About2</Link></a></li>
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
