import React, {Component} from 'react';
import { Session } from 'meteor/session';


export default class Title extends Component {
  render() {
    console.log(this);
    return(
      <div>
        <h1>{this.props.greeting}</h1>
        <p>Apic Ticket: {this.props.ticket.number}</p>
      </div>
    )
  }
}
