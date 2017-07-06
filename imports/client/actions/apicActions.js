import React, {Component} from 'react';

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
    async function getApicTicket() {
      var options = {
        url: "https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket",
        headers: {
          "content-type": "application/json",
          "cache-control": "no-cache"
        },
        body: {
          "username": 'devnetuser',
          "password": 'Cisco123!'
        }
      };
      return await request.get(options);
    }

    var body = await getCamoJson();
}
