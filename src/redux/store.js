import { createStore } from 'redux';
import rootReducer from './rootReducer';

const preloadedState = {

    identityReducer: {
        user: null,
        admin:null
    },

}

const store = createStore (
    rootReducer,
    preloadedState
);

export default store;
