import { Meteor } from 'meteor/meteor';

import React, {Component} from 'react';
import { HTTP } from 'meteor/http';

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
