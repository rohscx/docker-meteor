import React, {Component} from 'react';
import { Session } from 'meteor/session';
// WORK IN PROGRESS
export default class Trace extends Component {

  render() {
    return(
      <div>
      <button onClick={
        () => console.log(this)
      }>LOG PROPS TRACE</button>
      <div>
        {this.props.flowItem}
      </div>
    </div>
    )
  }
}
