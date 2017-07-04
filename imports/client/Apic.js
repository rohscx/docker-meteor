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
      console.log(res);	// debug
      this.ticket = res.data.response.serviceTicket;
      this.options.headers['x-auth-token'] = res.data.response.serviceTicket;
      //Session.set("apicTicket", res.data.response.serviceTicket);
      this.useTicket();
    }
  })};


  // Method USE the ticket from APIC
  restRequest.prototype.useTicket = function() {
    Meteor.call('checkApic', this.type, this.url, this.options, (err, res) => {
    let emptyArray = "This is unfortunate. No data has been returned..."
    if (err) {
      alert(err);
    } else {
      // will need to build response if the array return with zero returns
      // success!
      console.log(res); // debug
      // console.log(JSON.parse(JSON.stringify(res))); // debug
      // attempt at error correct on 0 items in array, need to fix this
      if(response.data.response.length == 0){

        this.dataObj = {response: {data: {dataError: emptyArray}}};
        //this.addToDB();
      } else {
        console.log('datadetected');
        this.dataObj = res.data;
        // console.log(this.dataObj);
        //Session.set("apicResponse", res.data.response);
        //this.addToDB();
      }
    }
  })};

  restRequest.prototype.addToDB = function() {
    Meteor.call('insertNewApic', this.ticket, this.dataObj, (err, res) => {
    if (err) {
      alert(err);
    } else {
      // console.log('Ticket submitted');
    }
  })};

  let apic = new restRequest('GET', 'https://devnetapi.cisco.com/sandbox/apic_em/api/v1/host', {
        headers: { 'content-type': 'application/json'}
      });
      //apic.makeTicket();
      // console.log('Ticket Rquested');
      // console.log(apic);
      // console.log('making Ticket');
      apic.makeTicket();
      // console.log('After');
}

render() {
  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={this.makeRequest.bind(this)}>
        New Apic Ticket
      </button>
      {this.props.ticketList()}
      {this.props.ipTrace()}
    </div>

  )
}
}
