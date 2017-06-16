import React from 'react';
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react'

// stateless functional component. Functuion returns what ever you like
const MainLayout = ({children}) =>
  <div className='main-layout'>
    <header>
      <h1><a href='/'>Level Up Voting</a></h1>
      <LoginButtons />
      <nav>
        <a href='/about'>About</a>
      </nav>
    </header>
    {children}
  </div>

export default MainLayout;
