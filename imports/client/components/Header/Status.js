import React, {Component} from 'react';
import { Session } from 'meteor/session';
// WORK IN PROGRESS
export default class Status extends Component {

  render() {
    const pStyles = {
    };
    return(
      <div>
        <p style={pStyles}>{this.props.greeting}</p>
      </div>
    )
  }
}
