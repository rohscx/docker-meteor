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

function fetchTicket(ticket) {
  return dispatch => {
    dispatch(requestPosts(ticket))
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
  }
}
