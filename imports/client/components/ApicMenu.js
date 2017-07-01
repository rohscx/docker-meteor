import React, {Component} from 'react';
import { Session } from 'meteor/session';
import Menu from './Header/Menu';

export default class ApicMenu extends Component {
  render() {
    console.log(this);
      return(
        <div>
          {this.props.menu.map((item, index) => {
            //return <Menu item={item} />
          })}
        </div>
      )
  }
}
