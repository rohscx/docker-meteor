import React, {Component} from 'react';
import restRequest from '../api/Apic';
import { Session } from 'meteor/session';


export default class RestApic extends Component {
  constructor() {
    super();
    this.state = {
      ticket: {
        number: "",
        state: false
      }
    }
  }

  getItems() {
    let apic = new restRequest('GET', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/host', {
          headers: { 'conten-type': 'application/json'}
        });
        apic.makeTicket();
        console.log('Ticket Rquested');
        console.log(apic);
        console.log(apic.ticket);
        this.setState({ticket: Session.get("apicTicket")});
        //this.setState({ticket: Session.get("apicTicket")});
        //this.setState({ticket: 'lkjhjkhjkhlkj'});

  }

  changeTicket(ticket) {

  }
  render() {
    if (!this.state.ticket.state) {
      return <p>WelCOme!</p>
    }
    console.log(this);
    return <p>Current Ticket: {this.state.ticket}</p>
  }
}
