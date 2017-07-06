const userReducer = (state = {
  name: "RedEye",
  age: 300
}, action) => {
  switch (action.type) {
    case "SET_NAME":
      state = {
        ...state,
        name: action.payload,
      };
      break;
    case "SET_AGE":
      state.result = {
        ...state,
        age: state.result - action.payload,
      };
      state.lastValues.push(action.payload);
      break;
  }
  return state;
};

export default userReducer;
