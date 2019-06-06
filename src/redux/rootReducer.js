import { combineReducers } from 'redux';

import identityReducer from './reducers/identityReducer.js'
import drawerReducer from './reducers/drawerReducer.js'

export default combineReducers({
    identityReducer,
    drawerReducer
});