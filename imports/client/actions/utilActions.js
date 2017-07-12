export function addNumber(number) {
  return {
    type: "ADD",
    payload: number
  };
}

export function subtractNumber(number) {
  return {
    type: "SUBTRACT",
    payload: number
  };
}

export function checkMac(mac) {
  return dispatch => {
      var regexp = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/i;
      var mac_address = mac;
    if(regexp.test(mac_address)) {
      console.log("Valid: "+ mac_address);
      return dispatch(setMacValidate("success"));
    } else {
      return dispatch(setMacValidate("error"));
    }
  }
}
