import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';

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
    //dispatch(getTicket(ticket))
    const  myHeaders = new Headers ({
      "content-type": "text/plain",
      "cache-control": "no-cache"
    });
    const myBody = new FormData ({
      username: 'devnetuser',
      password: 'Cisco123!'
    });
    const myInit = {
      method: 'POST',
      headers: myHeaders,
      body: myBody

    };
    return fetch(`https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket`, myInit)
      .then(response => response.json())
      .then(console.log("CANT DO IT MNA!"))
  }
}
