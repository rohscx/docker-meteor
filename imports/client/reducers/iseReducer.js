const iseReducer = (state = {
  ticket: "NO APIC TICKET",
  devices: "NO DEVICES"
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
    }
  return state;
};

export default iseReducer;
