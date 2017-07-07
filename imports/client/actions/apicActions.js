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

export function getTicket(ticket) {
  return dispatch => {
    return Meteor.call('checkApic', 'GET', "https://jsonplaceholder.typicode.com/posts/1", {}, (err, res) => {
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
      return dispatch({
        
      });
    }
  })

  }
}
