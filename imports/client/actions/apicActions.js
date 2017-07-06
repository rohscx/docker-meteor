import React, {Component} from 'react';

export function setTicket(ticket) {
  return {
    type: "SET_TICKET",
    payload: ticket
  };
}

export function setDevices(devices) {
  return {
    type: "SET_DEVICES",
    payload: devices
  };
}

export function setTrace(trace) {
  return {
    type: "SET_TRACE",
    payload: trace
  };
}

export function getTicket(ticket) {
  return dispatch => {
    function restRequest(options) {
      // always initialize all instance properties
      this.apicAPI = 'https://devnetapi.cisco.com/sandbox/apic_em';
      this.apicTicket = '/api/v1/ticket';
      this.apicFlow = '/api/v1/flow-analysis';
      this.apicFlowAnalysisId= '';
      this.apicTicketURL = this.apicAPI + this.apicTicket;
      this.apicFlowURL = this.apicAPI + this.apicFlow;
      this.apicFlowAnalysisIdURL= this.apicAPI + this.apicFlowAnalysisId;
      this.apicTicketOptions = {
        headers: { 'content-type': 'application/json' },
        data: {username: 'devnetuser', password: 'Cisco123!'}
      }
      this.apicFlowOptions = options;
    }
    // Method REQUEST a ticket from APIC
    restRequest.prototype.makeTicket = function() {
      Meteor.call('checkApic', 'POST', this.apicTicketURL, this.apicTicketOptions, (err, res) => {
      if (err) {
        alert(err);
      } else {
        // success!
        this.ticket = res.data.response.serviceTicket;
        this.apicFlowOptions.headers['x-auth-token'] = res.data.response.serviceTicket;
        //Session.set("apicTicket", res.data.response.serviceTicket);
        console.log(res);	// debug
        console.log(this); // debug
        //this.makeFlowID();
        return "BIRD MAN!!!!";
      }
    })};

    let apic = new restRequest({
          headers: { 'content-type': 'application/json'},
          data: { 'sourceIP': '10.2.1.22', 'destIP': '10.1.12.20'}
        });

        async function getFistUser () {
          let users = await apic.makeTicket();
          return console.log(users);
        }

  }
}
