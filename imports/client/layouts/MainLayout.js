import React from 'react';
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react'
import { Link } from 'react-router';

// stateless functional component. Functuion returns what ever you like
const MainLayout = ({children}) =>
  <div className='main-layout'>
      <ul>
        <li><a>Home</a></li>
        <li><a>News</a></li>
        <li><a>Contact</a></li>
        <li style="float:right"><a>About</a></li>
      </ul>
    {children}
  </div>

export default MainLayout;
