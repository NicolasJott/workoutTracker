import { combineReducers } from 'redux';


import authReducer from './auth';
import alertReducer from "./alert";
import workoutReducer from "./workout";


export default combineReducers({
    alert: alertReducer,
    auth: authReducer,
    workout: workoutReducer,
});