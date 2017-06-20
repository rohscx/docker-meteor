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

// stateless functional component. Functuion returns what ever you like
const MainLayout = ({children}) =>
  <div className='main-layout'>
    <header>
      <h1><Link to='/' style={styleObj} activeStyle={activeStyleObj}>FROST</Link></h1>
      <LoginButtons/>
      <nav>
        <Link to='/about' style={styleObj} activeStyle={activeStyleObj}>About</Link> | 
        <Link to='/about' style={styleObj} activeStyle={activeStyleObj}>RandomLink</Link>
      </nav>
    </header>
    {children}
  </div>

export default MainLayout;
