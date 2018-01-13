import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react'
import { Link } from 'react-router';
import {Navbar,Nav ,NavItem,NavDropdown,MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';


// mobile device tester
const divStylesGenerator = ()=>{
  // debug
  //console.log("Mobile Device Connected",/Mobi/.test(navigator.userAgent))
  let divStyles = (widthPercent)=>{
    return {
      margin: "auto",
      width: widthPercent
    };
  };
  // dynamically set the the width of the primary div. Mobile devices are 100%
  if (/Mobi/.test(navigator.userAgent) === true) {
    return divStyles("100%");
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
            <LinkContainer to='/wss'>
            <NavItem eventKey={4}>
              WebServerStatus
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
