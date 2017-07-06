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
    .post('/api/pet')
    .send({ name: 'Manny', species: 'cat' }) // sends a JSON post body
    .set('X-API-Key', 'foobar')
    .set('Accept', 'application/json')
    .end(function(err, res){
      // Calling the end function will send the request
    });
  }
}
