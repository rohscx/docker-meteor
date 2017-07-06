import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import qs from 'qs';

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
    });
    const myInit = {
      method: 'POST',
      //mode: 'no-cors',
      headers: {
        "content-type": "application/json",
        "cache-control": "no-cache"
      },
      body: {
        username: 'devnetuser',
        password: 'Cisco123!'
      }
    };
    console.log(myInit);

    let myRequest = new Request("https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket", myInit);
    return fetch(myRequest)
      .then(function(response) {
        console.log(response);
        return response.blob();
      })
      .then(function(myBlob) {
        console.log(myBlob);
      });
  }
}
