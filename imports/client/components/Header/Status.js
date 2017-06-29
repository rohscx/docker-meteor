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
    console.log(this.state.requestStatus);
  }

  render() {
    console.log(this.state.requestStaus);
    return(
      <div>
        <h1>{this.requestStatus}</h1>
      </div>
    )
  }
}
