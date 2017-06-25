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
        //this.setState({ticket.state: true})
        //this.setState({ticket: Session.get("apicTicket")});
        //this.setState({ticket: Session.get("apicTicket")});
        //this.setState({ticket: 'lkjhjkhjkhlkj'});

  }

  activateTicket(state) {

  }

  render() {
    console.log(this);
    if (!this.state.ticket.state) {
      return <p welcome={"WelcomE"}>
    }

    console.log(this);
    return <p changeTicket= {this.changeTicket.bind(this)} />
  }
}
