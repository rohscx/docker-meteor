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
      "withCredentials": "true",
    });
    let url = "https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket";

    let data = {
      username: 'devnetuser',
      password: 'Cisco123!'
    };

    let myInit = new Request(url, {
      method: 'POST',
      headers: myHeaders,
      body: data
    })

    console.log(myInit);


    return fetch(myInit)
      .then(function(response) {
        console.log(response);
        return response.blob();
      })
      .then(function(myBlob) {
        console.log(myBlob);
      });
  }
}
