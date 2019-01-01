import * as actionTypes from './actionTypes';

export const authStart = () => ({
    type: actionTypes.AUTH_START
});

export const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error
});

export const authlogout = () => ({
    type: actionTypes.AUTH_INITIATE_LOGOUT
});

export const authlogoutSuccess = () => ({
    type: actionTypes.AUTH_LOGOUT
});

export const checkAuthTimeOut = (exprirationTime) => ({
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    exprirationTime
});

export const authSuccess = ({ idToken, localId }) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId: localId
});

export const auth = (email, password, isSignUp) => ({
    type: actionTypes.AUTH_USER,
    email,
    password,
    isSignUp
});



export const authCheckState = () => ({
    type: actionTypes.AUTH_CHECK_STATE,
})