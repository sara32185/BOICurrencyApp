import { combineReducers } from 'redux';
import DataReducer from './data.reducer';


// Combine with other reducers we may add in the future
const appReducers = combineReducers({
    DataReducer
});


export default appReducers;