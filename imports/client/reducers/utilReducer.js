const utilReducer = (state = {
  macValidation: {
    macAddress:"",
    validationStatus:"",
    btnStyle: false
  }
}, action) => {
  switch (action.type) {
    case "MAC_VALIDATION":
      state = {
        ...state,
        macValidation: action.payload
      }
      break;
    case "SET_HOSTNAME":
    state = {
      ...state,
      hostName: action.payload
    }
    break;
  }
  return state;
};

export default utilReducer;
