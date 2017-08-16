import { Meteor } from 'meteor/meteor';

import React, {Component} from 'react';
import { HTTP } from 'meteor/http';

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

export function setFlowId(flowId) {
  return {
    type: "SET_FLOW_ID",
    payload: flowId
  };
}

export function setFlow(flow) {
  return {
    type: "SET_FLOW",
    payload: flow
  };
}

export function setShowTrace(showTrace) {
  return {
    type: "SET_SHOW_TRACE",
    payload: showTrace
  };
}

export function setTraceIp(traceIp) {
  return {
    type: "SET_TRACEIP",
    payload: traceIp
  };
}

export function setTraceStatus(traceStatus) {
  return {
    type: "SET_TRACESTATUS",
    payload: traceStatus
  };
}

export function setApicDevicesFind(blob) {
  return {
    type: "SET_APICDEVICESFIND",
    payload: blob
  };
}

export function setSortBy(value) {
  return {
    type: "SET_SORTBY",
    payload: value
  };
}

export function setValidationStatus(value) {
  return {
    type: "SET_VALIDATIONSTATUS",
    payload: value
  };
}

export function apicValidationStatus(status) {
  return dispatch => {
    return dispatch(setValidationStatus({
        validationStatus: status
      }));
  }
}

export function apicDevicesFind(deviceName,deviceFilter,cdase) {
  return dispatch => {
    if (cdase === null){
      return dispatch(setApicDevicesFind({
          deviceName: deviceName,
          validationStatus: false,
          btnStyle: true,
          byteType: deviceFilter
        }));
    } else {
      let newData = deviceName.trim().toLowerCase()
      if (newData.length <= 0) {
        return dispatch(setApicDevicesFind({
          deviceName: deviceName,
          validationStatus: false,
          btnStyle: false,
          byteType: deviceFilter
        }));
      } else {
        let newData = deviceName.trim().toLowerCase()
        return dispatch(setApicDevicesFind({
          deviceName: newData,
          validationStatus: false,
          btnStyle: true,
          byteType: deviceFilter
        }));
      }
    }
  }
}


export function sortBy(sortName, sortOrder) {
  return dispatch => {
    return dispatch(setSortBy({
      field:sortName,
      order: sortOrder
    }));
  }
}
