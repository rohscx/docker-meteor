const apicReducer = (state = {
  sortBy:{
    field:"reachabilityStatus",
    order: -1
  },
  apicDevicesFind:{
    deviceName: ".",
    validationStatus: null,
    btnStyle: false,
    byteType: "ALL"
  },
  dbReady:false
}, action) => {
  switch (action.type) {
    case "SET_APICDEVICESFIND":
    state = {
      ...state,
      apicDevicesFind: action.payload
    };
    break;
    case "SET_DBREADY":
    state = {
      ...state,
      dbReady: action.payload
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
