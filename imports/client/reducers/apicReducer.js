const apicReducer = (state = {
  ticket: "NO APIC TICKET",
  devices: "NO DEVICES",
  trace: "NO TRACES",
  flowId: "NO FLOW ID",
  flow: [{}],
  showTrace: false,
  traceIp:{
    source:"10.2.1.22",
    destination:"10.1.12.20"
  },
  traceStatus: {
    status: null,
    isReady: true
  },
  fabricConfig: "",
  sortBy:{
    field:"hostname",
    order: 1
  },
  apicDevicesFind:{
    number: "",
    validationStatus: false,
    btnStyle: false,
    byteType: "ALL"
  },
}, action) => {
  switch (action.type) {
    case "SET_TICKET":
    state = {
      ...state,
      ticket: action.payload
    };
    break;
    case "SET_DEVICES":
    state = {
      ...state,
      devices: action.payload
    };
    state.lastValues.push(action.payload);
    break;
    case "SET_TRACE":
    state = {
      ...state,
      trace: action.payload
    };
    break;
    case "SET_FLOW_ID":
    state = {
      ...state,
      flowId: action.payload
    };
    break;
    case "SET_FLOW":
    state = {
      ...state,
      flow: action.payload
    };
    break;
    case "SET_SHOW_TRACE":
    state = {
      ...state,
      showTrace: action.payload
    };
    break;
    case "SET_TRACEIP":
    state = {
      ...state,
      traceIp: action.payload
    };
    break;
    case "SET_TRACESTATUS":
    state = {
      ...state,
      traceStatus: action.payload
    };
    break;
    case "SET_CONFIG":
    state = {
      ...state,
      fabricConfig: action.payload
    };
    break;
    case "SET_APICDEVICESFIND":
    state = {
      ...state,
      apicDevicesFind: action.payload
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
