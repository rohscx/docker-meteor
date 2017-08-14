import React, {Component} from 'react';
import { Session } from 'meteor/session';
import Title from './Header/Title';
import Status from './Header/Status';
import Greeting from './Header/Greeting';

export default class Header extends Component {
  handleChange(){
    //console.log(this);
  }
  render() {
    const divStyles = {
      margin:"auto",
      paddingTop:"2%",
      paddingBottom:"2%"
    };
      return(
        <div style={divStyles}>
          <Title {... this.props}/>
          <Greeting {... this.props}/>
          <Status {... this.props}/>
        </div>
      )
  }
}
