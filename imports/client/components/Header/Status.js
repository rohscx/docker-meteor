import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class Status extends Component {
  constructor() {
    super();
    this.state = {
      requestStatus: true
    }
  }

  requestStatus() {
    return {requestStatus: false};
  }

  render() {
    console.log(this);
    return(
      <div>
        {this.requestStatus()}
        <h1>TEST</h1>
      </div>
    )
  }
}
