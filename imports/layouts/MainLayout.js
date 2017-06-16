import React from 'react';

// stateless functional component. Functuion returns what ever you like
const MainLayout = (props) => {
  return (
    <div className='main-layout'>
      {props.children}
    </div>
  )
}
export default MainLayout;
