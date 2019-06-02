var identityReducer = (state = {}, action) => {

    switch (action.type) {

        case 'LOGINASUSER':
            return { ...state, user: action.user, admin: null};


        case 'LOGINASADMIN':
            return { ...state, user: null, admin: action.user};

        case 'LOGOUT':
            return { ...state, user: false, admin:false};

        default:
            return state;
    }
}

export default identityReducer;
