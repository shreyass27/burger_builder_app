import * as actionTypes from './actionTypes';
import orderAxios from './../../axiosOrders';

const ingredientsAction = (ingredients) => ({
    type: actionTypes.SET_INGREDIENTS,
    ingredients
});


const fetchIngredientsFailed = () => ({
    type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const setIngredients = () => {
    return (dispatch) => {
        orderAxios.get('ingredients.json')
            .then(response => {
                dispatch(ingredientsAction(response.data));
            })
            .catch( error => {
                dispatch(fetchIngredientsFailed());
            });
    }
};



export const setAddIngredient = (ingredientName) => ({
    type: actionTypes.ADD_INGREDIENT,
    ingredientName
});


export const setRemoveIngredient = (ingredientName) => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName
});
