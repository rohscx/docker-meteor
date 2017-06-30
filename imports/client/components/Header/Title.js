import React, {Component} from 'react';
import { Session } from 'meteor/session';

export default class Title extends Component {

  render() {
    return(
      <div>
        <h1>{this.props.greeting}</h1>
        <p>Apic Ticket: {this.props.ticketStatus()}</p>
        {this.props.ticketList()}
      </div>
    )
  }
}
