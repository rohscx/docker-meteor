import React, {Component} from 'react';
import { HTTP } from 'meteor/http'

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

export function setFlowId(flowId) {
  return {
    type: "SET_FLOW_ID",
    payload: flowId
  };
}

export function setFlow(flow) {
  return {
    type: "SET_FLOW",
    payload: flow
  };
}

export function getTicket() {
  return dispatch => {
    apicAPI = 'https://devnetapi.cisco.com/sandbox/apic_em';
    apicTicket = '/api/v1/ticket';
    apicFlow = '/api/v1/flow-analysis';
    apicFlowAnalysisId= '';
    apicTicketURL = this.apicAPI + this.apicTicket;
    apicFlowURL = this.apicAPI + this.apicFlow;
    apicFlowAnalysisIdURL= this.apicAPI + this.apicFlowAnalysisId;
    apicOptions = {
      headers: { 'content-type': 'application/json' },
      data: {username: 'devnetuser', password: 'Cisco123!'}
    };

    return Meteor.call('checkApic', 'POST', apicTicketURL, apicOptions, (err, res) => {
      if (err) {
        alert(err);
      } else {
          // success!
          //this.ticket = res.data.response.serviceTicket;
          //this.apicFlowOptions.headers['x-auth-token'] = res.data.response.serviceTicket;
          //Session.set("apicTicket", res.data.response.serviceTicket);
          console.log(res);	// debug
          console.log(this); // debug
          //this.makeFlowID();
          return dispatch(setTicket(res.data.response.serviceTicket));
        }
    })
  }
}

export function getFlowId(ticket) {
  return dispatch => {
    apicAPI = 'https://devnetapi.cisco.com/sandbox/apic_em';
    apicTicket = '/api/v1/ticket';
    apicFlow = '/api/v1/flow-analysis';
    apicFlowAnalysisId= '';
    apicTicketURL = this.apicAPI + this.apicTicket;
    apicFlowURL = this.apicAPI + this.apicFlow;
    apicFlowAnalysisIdURL= this.apicAPI + this.apicFlowAnalysisId;
    apicOptions = {
      headers: {
        'content-type': 'application/json',
        'x-auth-token': ticket
      },
      data: {'sourceIP': '10.2.1.22', 'destIP': '10.1.12.20'}
    };

    return Meteor.call('checkApic', 'POST', apicFlowURL, apicOptions, (err, res) => {
      if (err) {
        alert(err);
      } else {
          // success!
          //this.ticket = res.data.response.serviceTicket;
          //this.apicFlowOptions.headers['x-auth-token'] = res.data.response.serviceTicket;
          //Session.set("apicTicket", res.data.response.serviceTicket);
          console.log(res);	// debug
          console.log(this); // debug
          //this.makeFlowID();
          return dispatch(setTicket(res.data.response.flowAnalysisId));
        }
    })
  }
}
