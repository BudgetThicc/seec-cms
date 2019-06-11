import { createStore } from 'redux';
import rootReducer from './rootReducer';

const preloadedState = {

    identityReducer: {
        user: null,
        admin:null
    },drawerReducer:{
        loading:false,
        closing:false,
        content:null
    },modalReducer:{
        signInVisible:false,
        signUpVisible:false,
        onCancel: null
    }

}


const store = createStore (
    rootReducer,
    preloadedState
);

export default store;
