import { combineReducers } from '@reduxjs/toolkit';
import appStateReducer from './reducers/appState';

const rootReducer = combineReducers({
  appState: appStateReducer,
});

export default rootReducer;
