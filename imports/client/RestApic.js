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
    this.getItems = this.getItems.bind(this);
  }

  getItems() {
    let apic = new restRequest('GET', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/host', {
          headers: { 'conten-type': 'application/json'}
        });
        apic.makeTicket();
        console.log('Ticket Rquested');
        console.log(apic);
        console.log(apic.ticket);
        console.log(this);
        //this.setState({ticket: Session.get("apicTicket")});
        //this.setState({ticket: Session.get("apicTicket")});
        //this.setState({ticket: 'lkjhjkhjkhlkj'});

  }

  activateTicket(state) {

  }

  render() {
    console.log(this);
    if (!this.state.ticket.state) {
      console.log('state is FALSE')
      return(
        <div>
          <Greeting greeting={"WelcomE"}/>
        </div>
      )
    }
  }
}
