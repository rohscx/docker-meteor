const prtgReducer = (state = {
  ticket: "NO APIC TICKET",
  devices: "NO DEVICES",
  devicesNameList:{
    defaultNone0: "nothing to see 0",
    defaultNone1: "nothing to see 1"
  },
  hostName: {
    name:"",
    validationStatus: null,
    btnStyle: false
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
    case "SET_DEVICE_NAME_LIST":
    state = {
      ...state,
      devices: action.payload
    };
    break;
    case "SET_HOSTNAME":
    state = {
      ...state,
      hostName: action.payload
    };
    break;
    }
  return state;
};

export default prtgReducer;
