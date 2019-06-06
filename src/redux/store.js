import { createStore } from 'redux';
import rootReducer from './rootReducer';

const preloadedState = {

    identityReducer: {
        user: null,
        admin:null
    },drawerReducer:{
        loading:false,
        content:null
    }

}

const store = createStore (
    rootReducer,
    preloadedState
);

export default store;
