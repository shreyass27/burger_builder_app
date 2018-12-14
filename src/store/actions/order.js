import * as actionTypes from './actionTypes';
import orderAxios from '../../axiosOrders';

const purchaseBurgerSuccess = (orderId, orderData) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId,
    orderData
});

const purchaseBurgerFailure = (error) => ({
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error
});

export const purchaseBurgerStart = () => ({
    type: actionTypes.PURCHASE_BURGER_START
});

export const purchaseInit = () => ({
    type: actionTypes.PURCHASE_INIT
});

export const purchaseBurger = (orderData) => {
    return (dispatch, getState) => {
        dispatch(purchaseBurgerStart());
        const authDetails = getState().auth;
        orderData.userId = authDetails.userId;
        orderAxios.post('orders.json?auth=' + authDetails.token, orderData )
            .then( response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch( error => {
                dispatch(purchaseBurgerFailure(error.message))
            });
    }
};


const fetchOrdersSuccess = (orders) => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
});

const fetchOrdersStart = () => ({
    type: actionTypes.FETCH_ORDERS_START
});

const fetchOrdersFail= (error) => ({
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
});

export const fetchOrders = () => {
    return (dispatch, getState) => {
        dispatch(fetchOrdersStart());
        const authDetails = getState().auth;
        orderAxios.get(`orders.json?auth=${authDetails.token}&orderBy="userId"&equalTo="${authDetails.userId}"`)
            .then( response => {
                    const fetchOrders = [];
                    for ( let key in response.data) {
                        fetchOrders.push({
                            ...response.data[key],
                            id: key
                        });
                    }
                    dispatch(fetchOrdersSuccess(fetchOrders));
            })
            .catch( error => { dispatch(fetchOrdersFail(error)) });
    }
}