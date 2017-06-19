import React from 'react';
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react'
import { Link } from 'react-router';


// stateless functional component. Functuion returns what ever you like
const MainLayout = ({children}) =>
  <div className='main-layout'>
    <header>
      <ul>
        <li><a class="active" href="#home">Home</a></li>
        <li><Link to='/'>News</a></li>
        <li><Link to='/'>Contact</a></li>
        <li style="float:right"><Link to='/'>About</a></li>
      </ul>
    </header>
    {children}
  </div>

export default MainLayout;
