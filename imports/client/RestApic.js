import React, {Component} from 'react';
import restRequest from '../api/Apic';
import { Session } from 'meteor/session';


export default class RestApic extends Component {
  constructor() {
    super();
    this.getItems = this.getItems.bind(this);
  }

  getItems() {
    let apic = new restRequest('GET', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/host', {
          headers: { 'conten-type': 'application/json'}
        });
        apic.makeTicket();
        console.log('Ticket Rquested');

        this.props.changeTicket(Session.get("apicTicket"));
        this.props.makeReady(Session.get("apicTicket"));
        console.log(apic);
        console.log("apic");
        console.log(apic.ticket);
        console.log("apic TICKET");
        console.log(this);
        console.log("THis");
        //this.setState({ticket: Session.get("apicTicket")});
        //this.setState({ticket: Session.get("apicTicket")});
        //this.setState({ticket: 'lkjhjkhjkhlkj'});

  }

  handleChange(){
    console.log(this);
  }

  render() {
    console.log(this);
    if (!this.props.ticket.ready) {
      console.log('ready prop is FALSE')
      return(
        <div>
          <p>{this.props.greeting}</p>
        </div>
      )
    }
    return (
      <div>
        <p> WOWOWOWOWOW</p>
      </div>
    )
  }
}
