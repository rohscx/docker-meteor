export function setMacValidation(status) {
  return {
    type: "MAC_VALIDATION",
    payload: status
  };
}

export function setHostName(status) {
  return {
    type: "SET_HOSTNAME",
    payload: status
  };
}

export function subtractNumber(number) {
  return {
    type: "SUBTRACT",
    payload: number
  };
}

export function setBandwidthCalc(number) {
  return {
    type: "SET_BANDWIDTHCALC",
    payload: number
  };
}

export function validateMac(mac) {
  return dispatch => {
      var regexp = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/i;
      var mac_address = mac;
    if(regexp.test(mac_address)) {
      console.log("Valid: "+ mac_address);
      return dispatch(setMacValidation({
          macAddress: mac_address,
          validationStatus: "success",
          btnStyle: true
        }));
    } else {
      console.log("Not Valid: "+ mac_address)
      return dispatch(setMacValidation({
          macAddress: mac_address,
          validationStatus: "error",
          btnStyle: false
        }));
    }
  }
}

export function hostName(hostName) {
  return dispatch => {
    let newHostName = hostName.trim().toLowerCase()
    if(hostName.length <= 0 ){
      return dispatch(setHostName({
        name: newHostName,
        validationStatus: null,
        btnStyle: false
      }));
    } else {
      let newHostName = hostName.trim().toLowerCase()
      return dispatch(setHostName({
        name: newHostName,
        validationStatus: "success",
        btnStyle: true
      }));
    }
  }
}

export function bandwidthCalc(bandwidth, byteType) {
  return dispatch => {
    let newData = bandwidth.trim().toLowerCase()
    newData = Number(newData)
    if (isNaN(newData)) {
      return dispatch(setBandwidthCalc({
        number: bandwidth,
        numberToBits: false,
        validationStatus: false,
        btnStyle: false,
        byteType: byteType ? byteType : ""
      }));
    } else {
      return dispatch(setBandwidthCalc({
        number: bandwidth,
        numberToBits: newData * 8,
        validationStatus: true,
        btnStyle: true,
        byteType: byteType ? byteType : ""
      }));
    }
  }
}
