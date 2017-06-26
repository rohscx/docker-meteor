import React, {Component} from 'react';
import { Session } from 'meteor/session';
import Title from './Header/Title';

export default class Header extends Component {
  handleChange(){
    console.log(this);
  }
  render() {
      return(
        <div>
            <Title />
        </div>
      )
  }
}
