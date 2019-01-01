import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';

import { authlogoutSuccess, authlogout, authStart, authSuccess, checkAuthTimeOut, authFail } from '../actions/auth';

 
export function* logoutSaga(action) {
    
    yield localStorage.removeItem('idToken')
    yield localStorage.removeItem('userId');
    yield localStorage.removeItem('exprirationTime');

    yield put(authlogoutSuccess());
}

export function* checkAuthTimeOutSaga(action) {
        yield delay(action.exprirationTime * 1000);
        yield put(authlogout())
}

export function* authUserSaga(action) {
        
    yield put(authStart());

    // Sync Code Below Asynce Coe
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    const authMethod = action.isSignUp ? 'signupNewUser' : 'verifyPassword';

    try {
        const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${authMethod}?key=AIzaSyAr8z91Q_c9XPSqyhq4FRa2VzIHVZ0NeOs`;
        const response = yield axios.post(url, authData);
        yield put(authSuccess(response.data));
        yield put(checkAuthTimeOut(+response.data.expiresIn));
    
        localStorage.setItem('idToken', response.data.idToken);
        localStorage.setItem('userId', response.data.localId);
                
        const exprirationTime = new Date( new Date().getTime() + (+response.data.expiresIn * 1000) );
        localStorage.setItem('exprirationTime', exprirationTime);

    } catch(error) {
        yield put(authFail(error.response.data.error));
    }
}



export function* authCheckStateSaga(action) {
        
    
    const idToken = localStorage.getItem('idToken');
    if (!idToken) {
        yield put(authlogout());
    } else {
        const expirationDate = new Date(localStorage.getItem('exprirationTime'));
        if (expirationDate <= new Date()) {
            yield put(authlogout());
        } else {
            const userId = localStorage.getItem('userId');
            yield put(authSuccess({idToken, localId: userId}));
            yield put(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000 ));
        }   
    }
}