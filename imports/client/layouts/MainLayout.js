import React from 'react';
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react'
import { Link } from 'react-router';

// stateless functional component. Functuion returns what ever you like
const MainLayout = ({children}) =>
  <div className='main-layout'>
    <header>
      <h1><Link to='/'>Level Up Voting</Link></h1>
      <LoginButtons />
      <nav>
        <Link to='/about' style={{ textDecoration: 'none' }} activeStyle={{ color: '#eee' }}>About</Link>
      </nav>
    </header>
    {children}
  </div>
