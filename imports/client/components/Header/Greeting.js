import React, {Component} from 'react';
import { Session } from 'meteor/session';
import {PageHeader} from 'react-bootstrap';
// WORK IN PROGRESS
export default class Greeting extends Component {

  render() {
    const pageHeaderStyles = {
      textAlign:"center"
    };
    return(
      <div>
        <PageHeader style={pageHeaderStyles}><p><small>{this.props.greeting}</small></p></PageHeader>
      </div>
    )
  }
}
