import { put, select } from 'redux-saga/effects';
import orderAxios from './../../axiosOrders';
import { purchaseBurgerStart, purchaseBurgerSuccess, purchaseBurgerFailure, fetchOrdersSuccess, fetchOrdersFail, fetchOrdersStart } from '../actions/order';

const getAuthState = state => state.auth;

export function* purchaseBurgerSaga(action) {
    try {
        yield put(purchaseBurgerStart());
        const authDetails = yield select(getAuthState);
        action.orderData.userId = authDetails.userId;

        const response = yield orderAxios.post('orders.json?auth=' + authDetails.token, action.orderData );
        yield put(purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put(purchaseBurgerFailure(error.message))
    }
}


export function* fetchOrdersSaga() {
    try {
        yield put(fetchOrdersStart());
        const authDetails = yield select(getAuthState);

        const response = yield orderAxios.get(`orders.json?auth=${authDetails.token}&orderBy="userId"&equalTo="${authDetails.userId}"`);
        
        const fetchOrders = [];
        for ( let key in response.data) {
            fetchOrders.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(fetchOrdersSuccess(fetchOrders));
    } catch (error) {
        yield put(fetchOrdersFail(error));
    }
}
