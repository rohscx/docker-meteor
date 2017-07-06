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

function getTicket(ticket) {
  return dispatch => {
    dispatch(requestPosts(ticket))
    return fetch(`https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket`)
      .then(response => response.json())
  }
}
