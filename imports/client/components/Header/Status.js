import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class Status extends Component {
  constructor() {
    super();
    this.state = {
      requestStatus: false
    }
  }

  requestStatus() {
    if (this.state.requestStatus == false) {
      this.setState(requestStatus, true)
    } else {
      this.setState(requestStatus, false)
    }
    console.log(this);
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
