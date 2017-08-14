import { Meteor } from 'meteor/meteor';

import React, {Component} from 'react';
import { HTTP } from 'meteor/http';

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

export function setApicDevicesFind(number) {
  return {
    type: "SET_APICDEVICESFIND",
    payload: number
  };
}

export function setSortBy(value) {
  return {
    type: "SET_SORTBY",
    payload: value
  };
}

export function apicDevicesFind(deviceName,deviceFilter,cdase) {
  return dispatch => {
    if (cdase === null){
      return dispatch(setApicDevicesFind({
          deviceName: deviceName,
          validationStatus: true,
          btnStyle: true,
          byteType: deviceFilter
        }));
    } else {
      let newData = deviceName.trim().toLowerCase()
      if (newData.length <= 0) {
        return dispatch(setApicDevicesFind({
          deviceName: deviceName,
          validationStatus: false,
          btnStyle: false,
          byteType: deviceFilter
        }));
      } else {
        let newData = deviceName.trim().toLowerCase()
        return dispatch(setApicDevicesFind({
          deviceName: newData,
          validationStatus: true,
          btnStyle: true,
          byteType: deviceFilter
        }));
      }
    }
  }
}


export function getTicket(sourceIp,destIp) {
  return dispatch => {
    // keep in mind that this value is LOCAL to EACH deployment SERVER...
    apicAPI = Meteor.settings.public.ApicEM.url;

    apicTicket = '/api/v1/ticket';
    apicFlow = '/api/v1/flow-analysis';
    apicFlowAnalysisId= '';
    apicTicketURL = this.apicAPI + this.apicTicket;
    apicFlowURL = this.apicAPI + this.apicFlow;
    apicFlowAnalysisIdURL= this.apicAPI + this.apicFlowAnalysisId;
    // serverside secrets
    apicUname = Meteor.settings.public.ciscoApicEM.uName;
    apicUpass = Meteor.settings.public.ciscoApicEM.uPass;

    apicOptions = {
      headers: { 'content-type': 'application/json' },
      data: {username: apicUname, password: apicUpass}
    };

    return Meteor.call('checkApic', 'POST', apicTicketURL, apicOptions, (err, res) => {
      if (err) {
        alert(err);
      } else {

          switch(expression) {
            case n:
              console.log("this");
              break;
            case n:
              console.log("this");
              break;
            default:
            console.log("this");
          }
          // success!
          //this.ticket = res.data.response.serviceTicket;
          //this.apicFlowOptions.headers['x-auth-token'] = res.data.response.serviceTicket;
          //Session.set("apicTicket", res.data.response.serviceTicket);
          console.log(res);	// debug
          console.log(this); // debug
          //this.makeFlowID();
          let ticket = res.data.response.serviceTicket;
          dispatch(getFlowId(ticket,sourceIp,destIp));
          return dispatch(setTicket(ticket));
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
          flowId = res.data.response.flowAnalysisId;
          dispatch(getFlowStatus(ticket, flowId))
          return dispatch(setFlowId(flowId));
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
          // used for loading button
          res.data.response.request.isReady = false;
          return dispatch(setTraceStatus(res.data.response.request));
        } else {
          // used for loading button
          res.data.response.request.isReady = true;
          res.data.response.request.dataReady = true;
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

export function getConfig(ticket,flowId) {
  return dispatch => {
    apicAPI = Meteor.settings.public.ApicEM.url;
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
