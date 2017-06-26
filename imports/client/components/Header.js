import React, {Component} from 'react';
import { Session } from 'meteor/session';
import Title from './Header/Title';

export default class Header extends Component {
  handleChange(){
    console.log(this);
  }
  render() {
    console.log(this;)
      return(
        <div>
            <Title {... this.props}/>
        </div>
      )
  }
}
