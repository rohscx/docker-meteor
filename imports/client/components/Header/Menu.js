import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class Menu extends Component {

  render() {
    return(
        <button>{this.props.item}</button>
    )
  }
}
