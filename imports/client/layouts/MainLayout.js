import React from 'react';
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react'
import { Link } from 'react-router';

// stateless functional component. Functuion returns what ever you like
const MainLayout = ({children}) =>
  <div className='main-layout'>
    <header>

      <Link to='/' style={{ textDecoration: 'none' }}>FROST
      <MenuItem style={{ paddingLeft: 13 }}>FROSTYFACE</MenuItem>
      </Link>
      <LoginButtons/>
      <nav>
        <Link to='/about'>About</Link>
      </nav>
    </header>
    {children}
  </div>

export default MainLayout;
 <MenuItem style={{ paddingLeft: 13 }}>Team 1</MenuItem>
