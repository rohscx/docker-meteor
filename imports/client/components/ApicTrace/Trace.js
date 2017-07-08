import React, {Component} from 'react';
import { Session } from 'meteor/session';
// WORK IN PROGRESS
export default class Trace extends Component {

  render() {
    return(
      <div>
        {this.props.flowIndex} ===>>>> {this.props.flowItem}
      </div>
    )
  }
}
