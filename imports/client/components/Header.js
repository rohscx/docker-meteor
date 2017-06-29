import React, {Component} from 'react';
import { Session } from 'meteor/session';
import Title from './Header/Title';
import Status from './Header/Status';

export default class Header extends Component {
  handleChange(){
    console.log(this);
  }
  render() {
    console.log(this);
      return(
        <div>
          <Title {... this.props}/>
        </div>
      )
  }
}
