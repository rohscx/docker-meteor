import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mathReducer from './reducers/mathReducer';
import userReducer from './reducers/userReducer';
import apicReducer from './reducers/apicReducer';
import iseReducer from './reducers/iseReducer';
import utilReducer from './reducers/utilReducer';

const myLogger = (store) => (next) => (action) => {

  const actionObj = (action) => {
    makeObj = {actionObj: action};
    return (
      makeObj
    );
  };
  console.log("Logged Action: ", actionObj());
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
