const apicReducer = (state = {
  ticket: "NO APIC TICKET",
  devices: "NO DEVICES",
  trace: "NO TRACES"
}, action) => {
  switch (action.type) {
    case "SET_TICKET":
      state = {
        ...state,
        ticket
      };
      break;
    case "SET_DEVICES":
      state = {
        ...state,
        devices
      };
      state.lastValues.push(action.payload);
      break;
    case "SET_TRACE":
      state = {
        ...state,
        trace
      };
      break;
    }
  return state;
};

export default apicReducer;
