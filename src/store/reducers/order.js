import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    isPurchasing: false
}

const addOrder = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    }
    return updateState(state, {
        orders: state.orders.concat(newOrder),
        loading: false,
        isPurchasing: false
    });
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateState(state, { isPurchasing: true });
        case actionTypes.PURCHASE_BURGER_START:
            return updateState(state, { loading: true });
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return addOrder(state, action);
        case actionTypes.PURCHASE_BURGER_FAILED:
            return updateState(state, { loading: false });

        case actionTypes.FETCH_ORDERS_START:
            return updateState(state, { loading: true });
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateState(state, { orders: action.orders, loading: false });
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateState(state, { loading: false });
        default:
            return state;
    }
}

export default orderReducer;