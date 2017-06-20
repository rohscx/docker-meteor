import React from 'react';
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react'
import { Link } from 'react-router';

// stateless functional component. Functuion returns what ever you like
const MainLayout = ({children}) =>
  <div className='main-layout'>
    <header>
      <p>
      <Link to='/' style={{ textDecoration: 'none' }}>
      <MenuItem style={{ paddingLeft: 13 }}>FROSTYFACE</MenuItem>
      </Link>
    </p>
      <LoginButtons/>
      <nav>
        <Link to='/about'>About</Link>
      </nav>
    </header>
    {children}
  </div>

export default MainLayout;
 <MenuItem style={{ paddingLeft: 13 }}>Team 1</MenuItem>
