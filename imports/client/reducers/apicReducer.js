const apicReducer = (state = {
  sortBy:{
    field:"reachabilityStatus",
    order: -1
  },
  apicDevicesFind:{
    deviceName: "(mpls|inet|dmvpn|centralized|dmz|wan|7k|5k)",
    validationStatus: null,
    btnStyle: false,
    byteType: "ALL"
  },
  dbReady:false,
  apicShowCommands:{
    showCommand: null,
    deviceId:null,
    validationStatus: null
  },
  apicShowCommandsResponse: null
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
    case "SET_APICSHOWCOMMANDS":
    state = {
      ...state,
      apicShowCommands: action.payload
    };
    break;
    case "SET_SHOWCOMMANDRESPONSE":
    state = {
      ...state,
      apicShowCommandsResponse: action.payload
    };
    break;
    }
  return state;
};

export default apicReducer;
