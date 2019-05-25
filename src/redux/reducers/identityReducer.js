var identityReducer = (state = {}, action) => {

    switch (action.type) {

        case 'LOGINASUSER':
            return { ...state, user: true, admin: false};


        case 'LOGINASADMIN':
            return { ...state, user: false, admin: true};

        case 'LOGOUT':
            return { ...state, user: false, admin:false};

        default:
            return state;
    }
}

export default identityReducer;
