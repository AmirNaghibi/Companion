import {combineReducers} from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    // all reducer files here
    authReducer: authReducer,
    
});

export default rootReducer;