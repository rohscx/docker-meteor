import React from 'react';
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react'
import { Link } from 'react-router';


// stateless functional component. Functuion returns what ever you like
const MainLayout = ({children}) =>
  <div className='main-layout'>
    <header>
      <ul>
        <li><a class="active" Link to='/'>Home</a></li>
        <li><a Link to='/'>News</a></li>
        <li><a Link to='/'>Contact</a></li>
        <li><Link to='/'>About</a></li>
      </ul>
    </header>
    {children}
  </div>

export default MainLayout;
