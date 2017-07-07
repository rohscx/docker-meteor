const apicReducer = (state = {
  ticket: "NO APIC TICKET",
  devices: "NO DEVICES",
  trace: "NO TRACES",
  flowID: "NO FLOW ID",
  flow: "NO FLOW"
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
    }
  return state;
};

export default apicReducer;
