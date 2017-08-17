import { Meteor } from 'meteor/meteor';

import React, {Component} from 'react';
import { HTTP } from 'meteor/http';

export function setApicDevicesFind(blob) {
  return {
    type: "SET_PRIMEDEVICESFIND",
    payload: blob
  };
}

export function setSortBy(value) {
  return {
    type: "SET_SORTBY",
    payload: value
  };
}

export function setDbReady(value) {
  return {
    type: "SET_DBREADY",
    payload: value
  };
}



export function primeDbReady(status) {
  return dispatch => {
    return dispatch(setDbReady({
        validationStatus: status
      }));
  }
}

export function primeDevicesFind(deviceName,deviceFilter,cdase) {
  return dispatch => {
    let nameValidator = (name)=>{
      if(name.length <= 0){
        return null;
      } else {
        return true;
      }
    }
    let defaultResult = ".";
    if (cdase === null){
      return dispatch(setApicDevicesFind({
          deviceName: deviceName,
          validationStatus: nameValidator(deviceName),
          btnStyle: true,
          byteType: deviceFilter
        }));
    } else {
      if (newData.length <= 0) {
        return dispatch(setApicDevicesFind({
          deviceName: defaultResult,
          validationStatus: false,
          btnStyle: false,
          byteType: deviceFilter
        }));
      } else {
        let newData = deviceName.trim().toUpperCase()
        return dispatch(setApicDevicesFind({
          deviceName: newData,
          validationStatus: true,
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
