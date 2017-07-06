import { createStore, combineReducers, applyMiddleware } from 'redux';
import mathReducer from './reducers/mathReducer';
import userReducer from './reducers/userReducer';
import apicReducer from './reducers/apicReducer';

const myLogger = (store) => (next) => (action) => {
  console.log("Logged Action: ", action);
  next(action);
};
export default createStore(combineReducers({
  mathReducer,
  userReducer}),
   {},
    applyMiddleware(myLogger));
