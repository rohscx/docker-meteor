import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mathReducer from './reducers/mathReducer';
import userReducer from './reducers/userReducer';
import apicReducer from './reducers/apicReducer';
import utilReducer from './reducers/utilReducer';

const myLogger = (store) => (next) => (action) => {
  console.log("Logged Action: ", action);
  next(action);
};
export default createStore(combineReducers({
  mathReducer,
  userReducer,
  apicReducer,
  utilReducer,
}),
   {},
    applyMiddleware(thunk)
  );
