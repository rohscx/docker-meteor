const apicReducer = (state = {
  ticket: "NO APIC TICKET",
  devices: "NO DEVICES",
  trace: "NO TRACES"
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
    }
  return state;
};

export default apicReducer;
