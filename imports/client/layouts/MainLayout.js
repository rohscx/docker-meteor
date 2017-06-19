import React from 'react';
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react'
import { Link } from 'react-router';

// stateless functional component. Functuion returns what ever you like
const MainLayout = ({children}) =>
  <div className='main-layout'>
    <header class="main-header">
    <div class="header-wrapper">
    <a href="/"><h1 class="site-title"></h1>
    </a><span class="main-nav-toggle">MENU</span><nav class="main-nav"><span class="main-nav-toggle">CLOSE MENU</span>
    <ul><li><a href="/tutorials">Tutorials</a></li>
    <li><a href="/about">About</a></li>
    <li><a target="_blank" href="http://store.leveluptutorials.com">Store</a></li>
    <li class="login-item"><div class="alt-accounts-log-in-buttons">
    <div class="alt-accounts-status">
    <div><button>Sign Up</button></div></div>
    <div class="alt-accounts-form-wrapper">
    </div>
    </div>
    </li>
    </ul>
    </nav>
    </div>
    </header>
    {children}
  </div>

export default MainLayout;
