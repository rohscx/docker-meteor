import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class Menu extends Component {

  render() {
    return(
      <div>
        <menu>{this.props.menuItem}</menu>
      </div>
    )
  }
}
