import React, {Component} from 'react';
import { Session } from 'meteor/session';
import Title from './Header/Title';
import Status from './Header/Status';
import Greeting from './Header/Greeting';

export default class Header extends Component {
  handleChange(){
    console.log(this);
  }
  render() {
    const divStyles = {
      paddingBottom:"5%"
    };
      return(
        <div style={divStyles}>
          <Title {... this.props}/>
          <Status {... this.props}/>
        </div>
      )
  }
}
