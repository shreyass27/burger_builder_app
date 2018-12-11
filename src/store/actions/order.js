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
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        orderAxios.post('orders.json', orderData )
            .then( response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch( error => {
                dispatch(purchaseBurgerFailure(error.message))
            });
    }
}