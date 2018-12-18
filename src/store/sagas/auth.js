import { put } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

 
export function* logoutSaga(action) {
    
    yield localStorage.removeItem('idToken')
    yield localStorage.removeItem('userId');
    yield localStorage.removeItem('exprirationTime');

    yield put({
        type: actionTypes.AUTH_LOGOUT
    });
}