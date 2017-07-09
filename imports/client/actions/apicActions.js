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

export function setShowTrace(showTrace) {
  return {
    type: "SET_SHOW_TRACE",
    payload: showTrace
  };
}

export function setTraceIp(traceIp) {
  return {
    type: "SET_TRACEIP",
    payload: traceIp
  };
}

export function setTraceStatus(traceStatus) {
  return {
    type: "SET_TRACESTATUS",
    payload: traceStatus
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

export function getFlowId(ticket,sourceIp,destIp) {
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
      data: {
        'sourceIP': sourceIp,
       'destIP': destIp
     }
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
          return dispatch(setFlowId(res.data.response.flowAnalysisId));
        }
    })
  }
}

export function getFlowStatus(ticket,flowId) {
  return dispatch => {
    apicAPI = 'https://devnetapi.cisco.com/sandbox/apic_em';
    apicTicket = '/api/v1/ticket';
    apicFlow = '/api/v1/flow-analysis';
    apicFlowAnalysisId= "/" + flowId;
    apicTicketURL = this.apicAPI + this.apicTicket;
    apicFlowURL = this.apicAPI + this.apicFlow;
    apicFlowAnalysisIdURL= apicFlowURL + apicFlowAnalysisId;
    apicOptions = {
      headers: {
        'content-type': 'application/json',
        'x-auth-token': ticket
      },
      data: {}
    };
    return Meteor.call('checkApic', 'GET', apicFlowAnalysisIdURL, apicOptions, (err, res) => {
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
        if(res.data.response.request.status == "INPROGRESS"){
          return dispatch(setTraceStatus(res.data.response.request));
        } else {
          return dispatch(setTraceStatus(res.data.response.request));
        }
      }
    })
  }
}

export function getFlow(ticket,flowId) {
  return dispatch => {
    apicAPI = 'https://devnetapi.cisco.com/sandbox/apic_em';
    apicTicket = '/api/v1/ticket';
    apicFlow = '/api/v1/flow-analysis';
    apicFlowAnalysisId= "/" + flowId;
    apicTicketURL = this.apicAPI + this.apicTicket;
    apicFlowURL = this.apicAPI + this.apicFlow;
    apicFlowAnalysisIdURL= apicFlowURL + apicFlowAnalysisId;
    apicOptions = {
      headers: {
        'content-type': 'application/json',
        'x-auth-token': ticket
      },
      data: {}
    };
    return Meteor.call('checkApic', 'GET', apicFlowAnalysisIdURL, apicOptions, (err, res) => {
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
          return dispatch(setFlow(res.data.response.networkElementsInfo));
        }
    })
  }
}
