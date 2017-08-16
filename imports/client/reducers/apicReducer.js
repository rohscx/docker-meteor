const apicReducer = (state = {
  sortBy:{
    field:"reachabilityStatus",
    order: -1
  },
  apicDevicesFind:{
    deviceName: ".",
    validationStatus: false,
    btnStyle: false,
    byteType: "ALL"
  },
}, action) => {
  switch (action.type) {
    case "SET_APICDEVICESFIND":
    state = {
      ...state,
      apicDevicesFind: action.payload
    };
    break;
    case "SET_VALIDATIONSTATUS":
    state = {
      ...state,
      apicDevicesFind.validationStatus: action.payload
    };
    break;
    case "SET_SORTBY":
    state = {
      ...state,
      sortBy: action.payload
    };
    break;
    }
  return state;
};

export default apicReducer;
