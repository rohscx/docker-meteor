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
  },
  sortBy:{
    field:"aca",
    order: 1
  },
  dnsSuffix: ".fpi.fpir.pvt"
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
    case "SET_SORTBY":
    state = {
      ...state,
      sortBy: action.payload
    };
    break;
    case "SET_DNSSUFFIX":
    state = {
      ...state,
      dnsSuffix: action.payload
    };
    break;
  }
  return state;
};

export default utilReducer;
