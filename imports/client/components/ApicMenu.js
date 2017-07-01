import React, {Component} from 'react';
import { Session } from 'meteor/session';
import Menu from './Header/Menu';

export default class ApicMenu extends Component {
  handleChange(){
    console.log(this);
  }
  render() {
    console.log(this);
      return(
        <div>
          {this.props.menuItem.map((item, index) => {
            return <Menu item="item" />
          })}
        </div>
      )
  }
}
