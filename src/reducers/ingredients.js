const initialState = {
    ingredients: null,
    totalPrice: 0
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_INGREDIENTS':
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: action.totalPrice
            };
        default:
            return state;
    }
}

export default reducer;