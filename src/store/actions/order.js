import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (orderId, orderData) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId,
    orderData
});

export const purchaseBurgerFailure = (error) => ({
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error
});

export const purchaseBurgerStart = () => ({
    type: actionTypes.PURCHASE_BURGER_START
});

export const purchaseInit = () => ({
    type: actionTypes.PURCHASE_INIT
});

export const purchaseBurger = (orderData) => ({
    type: actionTypes.PURCHASE_BURGER,
    orderData
});

export const fetchOrdersSuccess = (orders) => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
});

export const fetchOrdersStart = () => ({
    type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrdersFail= (error) => ({
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
});

export const fetchOrders = () => ({
    type: actionTypes.FETCH_ORDERS,
});
