const apicReducer = (state = {
  ticket: "NO APIC TICKET",
  devices: "NO DEVICES",
  trace: "NO TRACES",
  flowId: "NO FLOW ID",
  flow: [
    {defaultData: "NO FLOW1"},
    {defaultData: "NO FLOW2"},
    {defaultData: "NO FLOW3"}
  ],
  showTrace: false,
  traceIp:{
    source:"10.2.1.22",
    destination:"10.1.12.20"
  },
  traceStatus: {
    status: null,
    isReady: true
  }
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
    }
  return state;
};

export default apicReducer;
