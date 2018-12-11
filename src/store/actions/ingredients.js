import * as actionTypes from './actionTypes';

export const setIngredients = (ingredients) => ({
    type: actionTypes.SET_INGREDIENTS,
    ingredients
});


export const setAddIngredient = (ingredientName) => ({
    type: actionTypes.ADD_INGREDIENT,
    ingredientName
});


export const setRemoveIngredient = (ingredientName) => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName
});
