import { put } from 'redux-saga/effects';
import orderAxios from './../../axiosOrders';
import { ingredientsAction, fetchIngredientsFailed } from '../actions/ingredients';

export function* initIngredientsSaga() {
    try {
        const response = yield orderAxios.get('ingredients.json');
        yield put(ingredientsAction(response.data));

    } catch(error) {
        yield put(fetchIngredientsFailed());
    }
}