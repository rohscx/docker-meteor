import { Meteor } from 'meteor/meteor';
import React from 'react';
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react'
import { Link } from 'react-router';
import {Navbar,Nav ,NavItem,NavDropdown,MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';


/*
// stateless functional component. Functuion returns what ever you like

const MainLayout = ({children}) =>
  <div className='main-layout'>
    <header>
      <h1><Link to='/' style={styleObj} activeStyle={activeStyleObj}>FROST</Link></h1>
      <LoginButtons/>
      <nav>
        <Link to='/apic' style={styleObj} activeStyle={activeStyleObj}> APIC-EM </Link>
        <Link to='/ise' style={styleObj} activeStyle={activeStyleObj}> ISE </Link>
        <Link to='/prtg' style={styleObj} activeStyle={activeStyleObj}> PRTG </Link>
        <Link to='/trfr' style={styleObj} activeStyle={activeStyleObj}> TRANSF..RATE </Link>
        <Link to='/about' style={styleObj} activeStyle={activeStyleObj}> About </Link>

      </nav>
    </header>
    {children}
  </div>
*/

/*
const divStyles = {
  margin: "auto",
  width: "60%"
};
*/

// mobile device tester
const divStylesGenerator = ()=>{
  // debug
  console.log("Mobile Device Connected",/Mobi/.test(navigator.userAgent))
  let divStyles = (widthPercent)=>{
    return {
      margin: "auto",
      width: widthPercent
    };
  };
  // dynamically set the the width of the primary div. Mobile devices are 100%
  if (/Mobi/.test(navigator.userAgent) === true) {
    return divStyles("98%");
  } else {
    return divStyles("60%");
  }
}

const navBarStyles = {
  borderRadius:'0px'
};

const MainLayout = ({children}) =>
  <div>
    <header>
      <LinkContainer to='/'>
      <Navbar inverse collapseOnSelect style={navBarStyles}>
        <Navbar.Header>
          <Navbar.Brand>
            {Meteor.settings.public.siteBranding.navBarBrand}
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to='/apicdev'>
              <NavItem eventKey={1}>
                Devices
              </NavItem>
            </LinkContainer>
            <LinkContainer to='/hpi'>
            <NavItem eventKey={2}>
              Hosts
            </NavItem>
            </LinkContainer>
            <LinkContainer to='/prtg'>
            <NavItem eventKey={3}>
              Circuits
            </NavItem>
            </LinkContainer>
            <LinkContainer to='/wss'>
            <NavItem eventKey={4}>
              WebServerStatus
            </NavItem>
            </LinkContainer>
            <LinkContainer to='/ise'>
            <NavItem eventKey={5}>
              ISE
            </NavItem>
            </LinkContainer>
            <NavDropdown eventKey={10} title="Utilities" id="basic-nav-dropdown">
              <LinkContainer to='/trfr'>
                <MenuItem eventKey={10.1}>Bandwidth-Calculator</MenuItem>
              </LinkContainer>
              <MenuItem eventKey={10.2}>Another action</MenuItem>
              <MenuItem eventKey={10.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={10.3} >Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} >
              <LoginButtons/>
            </NavItem>
            <LinkContainer to='/about'>
            <NavItem eventKey={2}>
              About
            </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </LinkContainer>
    </header>
    <div style={divStylesGenerator()}>
      {children}
    </div>
  </div>


export default MainLayout;
