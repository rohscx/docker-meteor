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
    Meteor.methods({
      checkTwitter(userId) {
        check(userId, String);
        this.unblock();
        try {
          const result = HTTP.call('GET', 'https://jsonplaceholder.typicode.com/posts/1', {
            params: { }
          });
          console.log(result);
        return true;
        } catch (e) {
          // Got a network error, timeout, or HTTP error in the 400 or 500 range.
          return false;
        }
      }
    });
  }
}
