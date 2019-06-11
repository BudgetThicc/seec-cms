import { combineReducers } from 'redux';

import identityReducer from './reducers/identityReducer.js'
import drawerReducer from './reducers/drawerReducer.js'
import modalReducer from './reducers/modalReducer.js'

export default combineReducers({
    identityReducer,
    drawerReducer,
    modalReducer
});