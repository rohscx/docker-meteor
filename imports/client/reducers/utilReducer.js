const utilReducer = (state = {
  macValidation: '';
}, action) => {
  switch (action.type) {
    case "MAC_VALIDATION":
      state = {
        ...state,
        macValidation: action.payload
      };
      break;
  }
  return state;
};

export default utilReducer;
