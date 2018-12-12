import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => ({
    type: actionTypes.AUTH_START
});

export const authSuccess = (authData) => ({
    type: actionTypes.AUTH_SUCCESS,
    authData
});

export const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error
});

export const auth = (email, password, isSignUp) => {
    return (dispatch) => {
        dispatch(authStart());

        const authData = {
            email,
            password,
            returnSecureToken: true
        };

        const authMethod = isSignUp ? 'signupNewUser' : 'verifyPassword'
        axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/${authMethod}?key=AIzaSyAr8z91Q_c9XPSqyhq4FRa2VzIHVZ0NeOs`, authData)
            .then(res => {
                console.log(res);
                dispatch(authSuccess(res.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error));
            });
    }
};

