import React, {Component} from 'react';
import { Session } from 'meteor/session';
import {PageHeader} from 'react-bootstrap';
// WORK IN PROGRESS
export default class Greeting extends Component {

  render() {
    const pStyles = {
      width:"90%",
      paddingLeft:"2%"
    };
    return(
      <div>
        <PageHeader><small>{this.props.greeting}</small></PageHeader>
      </div>
    )
  }
}
