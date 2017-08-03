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
      hostname: action.payload
    }
    break;
  }
  return state;
};

export default utilReducer;
