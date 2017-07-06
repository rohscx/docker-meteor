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
      "content-type": "application/json",
      "cache-control": "no-cache",
      "postman-token", "19f73ba6-3cc6-6ec4-4778-e0a3f0b6cc41"
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
