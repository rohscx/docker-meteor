
import {LoginButtons} from 'meteor/okgrow:accounts-ui-react'
import { Route, RouteHandler, Link } from 'react-router';
import { Button, Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


// style object for nav bar
const styleObj = {
  color: '#eee',
  textDecoration: 'none'
};
// active style object for nav bar
const activeStyleObj = {
  color: '#eee'
};

/*
<div className='main-layout'>
  <header>
    <h1><Link to='/'>FROST</Link></h1>
    <LoginButtons/>
    <nav>
      <Link to='/apic'>APIC-EM</Link> |
      <Link to='/ise'>ISE</Link> |
      <Link to='/about'>About</Link>

    </nav>
  </header>

</div>
*/

// stateless functional component. Functuion returns what ever you like



export default class MainLayout extends Component {
  MainLayout({children}) =>{
    <div>
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
              <button type="button" className="navbar-toggle" dataToggle="collapse" dataTarget="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">Frost</a>
          </div>
          <div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                <li><a href="/apic">Section 1</a></li>
                <li><a href="/ise">Section 2</a></li>
                <li><a href="about">Section 3</a></li>
                <li className="dropdown"><a className="dropdown-toggle" dataToggle="dropdown" href="#">Section 4 <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="#section41">Section 4-1</a></li>
                    <li><a href="#section42">Section 4-2</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div>
        {children}
      </div>
    </div>
  }

  render() {
    return (
      {this.MainLayout()}
    )
  }
}
