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
    numberToBits: false,
    validationStatus: false,
    btnStyle: false,
    byteType: "MB"
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
