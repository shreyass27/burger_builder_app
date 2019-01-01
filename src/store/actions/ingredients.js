import * as actionTypes from './actionTypes';

export const ingredientsAction = (ingredients) => ({
    type: actionTypes.SET_INGREDIENTS,
    ingredients
});

export const fetchIngredientsFailed = () => ({
    type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const initIngredients = () => ({
    type: actionTypes.INIT_INGREDIENTS
});

export const setAddIngredient = (ingredientName) => ({
    type: actionTypes.ADD_INGREDIENT,
    ingredientName
});


export const setRemoveIngredient = (ingredientName) => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName
});
