const utilReducer = (state = {
  macValidate: '';
}, action) => {
  switch (action.type) {
    case "MAC_VALIDATE":
      state = {
        ...state,
        macValidate: action.payload
      };
      break;
    case "SUBTRACT":
      state.result = {
        ...state,
        result: state.result - action.payload,
        lastValues: [...state.lastValues, action.payload]
      };
      state.lastValues.push(action.payload);
      break;
  }
  return state;
};

export default utilReducer;
