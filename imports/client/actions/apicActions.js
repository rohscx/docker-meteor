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

    const myData = new FormData();
    myData.append("username", 'devnetuser');
    myData.append("password", 'Cisco123');

    const  myHeaders = new Headers ({
      "cache-control": "no-cache"

    });
    let url = "https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket";



    let myInit = new Request(url, {
      method: 'POST',
      headers: myHeaders,
      body: myData
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
