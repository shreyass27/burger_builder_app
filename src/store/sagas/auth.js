import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { authlogoutSuccess, authlogout } from '../actions/auth';

 
export function* logoutSaga(action) {
    
    yield localStorage.removeItem('idToken')
    yield localStorage.removeItem('userId');
    yield localStorage.removeItem('exprirationTime');

    yield put(authlogoutSuccess());
}

export function* checkAuthTimeOutSaga(action) {
        yield delay(action.exprirationTime * 1000);
        yield put(authlogout())
};