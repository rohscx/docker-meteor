const apicReducer = (state = {
  sortBy:{
    field:"associationTime",
    order: -1
  },
  primeDevicesFind:{
    deviceName: ".",
    validationStatus: null,
    btnStyle: false,
    byteType: "ALL"
  },
  dbReady:false
}, action) => {
  switch (action.type) {
    case "SET_PRIMEDEVICESFIND":
    state = {
      ...state,
      primeDevicesFind: action.payload
    };
    break;
    case "SET_DBREADY":
    state = {
      ...state,
      dbReady: action.payload
    };
    break;
    case "SET_SORTBY":
    state = {
      ...state,
      sortBy: action.payload
    };
    break;
    }
  return state;
};

export default apicReducer;
