export function setMacValidation(status) {
  return {
    type: "MAC_VALIDATION",
    payload: status
  };
}

export function subtractNumber(number) {
  return {
    type: "SUBTRACT",
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
          bthStyle: true
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
