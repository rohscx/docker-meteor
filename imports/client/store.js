import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mathReducer from './reducers/mathReducer';
import userReducer from './reducers/userReducer';
import apicReducer from './reducers/apicReducer';
import iseReducer from './reducers/iseReducer';
import utilReducer from './reducers/utilReducer';

const myLogger = (store) => (next) => (action) => {
  const actionObj = (action) => {
    return (
      //JSON.parse(action);
    );
  };
  console.log("Logged Action: ", action;
  next(action);
};
export default createStore(combineReducers({
  mathReducer,
  userReducer,
  apicReducer,
  iseReducer,
  utilReducer
}),
   {},
    applyMiddleware(myLogger, thunk)
  );
