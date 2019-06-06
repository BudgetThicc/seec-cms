var drawerReducer = (state = {}, action) => {

    switch (action.type) {

        case 'SHOWDRAWER':
            return { ...state, content: action.content, loading: true};


        case 'RESETDRAWER':
            return { ...state, loading:false};

        default:
            return state;
    }
}

export default drawerReducer;
