import { combineReducers } from '@reduxjs/toolkit';
import appStateReducer from './reducers/appState';
import employeeReducer from './reducers/employeeState';

const rootReducer = combineReducers({
  appState: appStateReducer,
  employees: employeeReducer,
});

export default rootReducer;
