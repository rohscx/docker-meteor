import React from 'react';
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react'

// stateless functional component. Functuion returns what ever you like
const MainLayout = (props) => {
  return (
    <div className='main-layout'>
      <header>
        <h1>Level Up Voting</h1>
        <LoginButtons />
      </header>
      {props.children}
    </div>
  )
}
export default MainLayout;
