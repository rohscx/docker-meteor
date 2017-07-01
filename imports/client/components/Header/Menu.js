import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class Menu extends Component {

  render() {
    return(
        <button type="button" className="btn btn-primary">{this.props.menuList}</button>
    )
  }
}
