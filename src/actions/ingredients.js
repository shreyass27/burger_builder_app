export const setIngredients = (ingredients) => ({
    type: 'SET_INGREDIENTS',
    ingredients
});


export const setAddIngredient = (ingredientName) => ({
    type: 'ADD_INGREDIENT',
    ingredientName
});


export const setRemoveIngredient = (ingredientName) => ({
    type: 'REMOVE_INGREDIENT',
    ingredientName
});
