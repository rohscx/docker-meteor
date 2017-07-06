import React, {Component} from 'react';
import request from 'superagent';

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
    request
    .post('https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket')
    .send({ username: 'devnetuser', password: 'Cisco123!' }) // sends a JSON post body
    .set("content-type": "application/json")
    .set("cache-control": "no-cache")
    .end(function(err, res){
      // Calling the end function will send the request
    });
  }
}
