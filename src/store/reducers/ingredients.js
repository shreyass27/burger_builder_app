import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../utility';

const INGREDIENT_CONST = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const addIngredients = (state, action) => {
    const updatedValues = {
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_CONST[action.ingredientName]
    };

    return updateState(state, updatedValues);
};

const removeIngredients = (state, action) => {
    const updatedValues = {
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_CONST[action.ingredientName]
    };
    
    return updateState(state, updatedValues);
};

const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredients(state, action);

        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredients(state, action);

        case actionTypes.SET_INGREDIENTS:
            const updateValues = {
                ingredients: action.ingredients,
                totalPrice: initialState.totalPrice,
                error: false
            };
            return updateState(state, updateValues);
            
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateState(state, { error: true });

        default:
            return state;
    }
}

export default ingredientReducer;