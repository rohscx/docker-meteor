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
    this.setState(previousState => {
      return {requestStatus: !perviousState.requestStatus};
    });
    console.log(this);
  }

  render() {
    console.log(this);
    return(
      <div>
        {this.requestStatus}
        <h1>TEST</h1>
      </div>
    )
  }
}
