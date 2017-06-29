import React, {Component} from 'react';
import { Session } from 'meteor/session';
// WORK IN PROGRESS
export default class Status extends Component {
  constructor() {
    super();
    this.state = {
      requestStatus: true
    }
  }


  render() {

    return(
      <p>Cats</p>
    )
  }
}
