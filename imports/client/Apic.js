import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';
import React, {Component} from 'react';



export default class Apic extends Component {


makeRequest() {
  console.log(this);

  // Constructor
  function restRequest(type, url, options) {
    // always initialize all instance properties
    this.type = type;
    this.url = url;
    this.options = options;
    this.typeTicket = 'POST';
    this.urlTicket = 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket';
    this.optionsTicket = {
          headers: { 'content-type': 'application/json' },
  	data: {username: 'devnetuser', password: 'Cisco123!'}
     };
  }

  // Method REQUEST a ticket from APIC
  restRequest.prototype.makeTicket = function() {
    Meteor.call('checkApic', this.typeTicket, this.urlTicket, this.optionsTicket, (err, res) => {
    if (err) {
      alert(err);
    } else {
      // success!
      // console.log(res.data.response.serviceTicket);	// debug
      this.ticket = res.data.response.serviceTicket;
      this.options.headers['x-auth-token'] = res.data.response.serviceTicket;
      //Session.set("apicTicket", res.data.response.serviceTicket);
      this.useTicket();
    }
  })};


  // Method USE the ticket from APIC
  restRequest.prototype.useTicket = function() {
    Meteor.call('checkApic', this.type, this.url, this.options, (err, res) => {
    if (err) {
      alert(err);
    } else {
      // success!
      console.log(res); // debug
      console.log(JSON.parse(JSON.stringify(res))); // debug
      this.dataObj = res.data;
      this.response = res;
      console.log(this.dataObj);
      //Session.set("apicResponse", res.data.response);
      //this.addToDB();
    }
  })};

  restRequest.prototype.addToDB = function() {
    Meteor.call('insertNewApic', this.ticket, this.dataObj, (err, res) => {
    if (err) {
      alert(err);
    } else {
      console.log('Ticket submitted');
    }
  })};

  let apic = new restRequest('GET', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/host', {
        headers: { 'content-type': 'application/json'}
      });
      //apic.makeTicket();
      console.log('Ticket Rquested');
      console.log(apic);
      console.log('making Ticket');
      apic.makeTicket();
      console.log('After');
}

render() {
    console.log(this);
  return (
    <div>
      <p> OKAY THIS SEEMS TO WORK</p>
      <button onClick={this.makeRequest.bind(this)}>
        apicGet
      </button>
    </div>

  )
}
}
