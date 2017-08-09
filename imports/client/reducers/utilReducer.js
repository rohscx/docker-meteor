const utilReducer = (state = {
  macValidation: {
    macAddress:"",
    validationStatus:"",
    btnStyle: false
  },
  hostName: {
    name:"",
    validationStatus: null,
    btnStyle: false
  },
  bandwidthCalcData:{
    number: "",
    validationStatus: "",
    btnStyle: false,
    byteType: ""
  }
}, action) => {
  switch (action.type) {
    case "MAC_VALIDATION":
    state = {
      ...state,
      macValidation: action.payload
    };
    break;
    case "SET_HOSTNAME":
    state = {
      ...state,
      hostName: action.payload
    };
    break;
    case "SET_BANDWIDTHCALC":
    state = {
      ...state,
      bandwidthCalcData: action.payload
    };
    break;
  }
  return state;
};

export default utilReducer;
