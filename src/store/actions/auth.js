import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => ({
    type: actionTypes.AUTH_START
});

const authSuccess = ({ idToken, localId }) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId: localId
});

const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error
});

const authlogout = () => ({
    type: actionTypes.AUTH_LOGOUT
});

const checkAuthTimeOut = (exprirationTime) => {
    return (dispatch) => {
        setTimeout( () => dispatch(authlogout() ), exprirationTime * 1000 )
    }
}

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
                dispatch(authSuccess(res.data));
                dispatch(checkAuthTimeOut(+res.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            });
    }
};
