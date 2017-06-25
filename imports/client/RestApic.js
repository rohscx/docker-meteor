import React, {Component} from 'react';
import restRequest from '../api/Apic';
import { Session } from 'meteor/session';

export default class Item extends Component {
  getItems() {
    let apic = new restRequest('GET', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/host', {
          headers: { 'conten-type': 'application/json'}
        });
  apic.makeTicket();
  console.log('Ticket Rquested');
  console.log(apic);
  console.log(apic.ticket);
  return <p>Current Ticket: {this.state.ticket}</p>
  // console.log(object); // debug

  // Requests NEW ticket from APIC
  /*
  object.makeTicket(function (err, data) {
    if (err) {
      console.log('aadfasdfasdfsfasdf');
      console.log(err)
    }
    console.log('WOWOWOWOWOW');

    //console.log(object); // debug
    //console.log('CATS ON EVERYTHING'); // debug
    //this.setState({ticket: Session.get("apicTicket")});
    //this.setState({ticket: 'lkjhjkhjkhlkj'});

  });
  */

}
}
