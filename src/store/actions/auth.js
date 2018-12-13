import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => ({
    type: actionTypes.AUTH_START
});

const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error
});

export const authlogout = () => {
    
    localStorage.removeItem('idToken')
    localStorage.removeItem('userId');
    localStorage.removeItem('exprirationTime');

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

const checkAuthTimeOut = (exprirationTime) => {
    return (dispatch) => {
        setTimeout( () => dispatch(authlogout() ), exprirationTime * 1000 )
    }
};

const authSuccess = ({ idToken, localId }) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId: localId
});

export const auth = (email, password, isSignUp) => {
    return (dispatch) => {
        dispatch(authStart());

        const authData = {
            email,
            password,
            returnSecureToken: true
        };

        const authMethod = isSignUp ? 'signupNewUser' : 'verifyPassword';
        axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/${authMethod}?key=AIzaSyAr8z91Q_c9XPSqyhq4FRa2VzIHVZ0NeOs`, authData)
            .then(res => {
                dispatch(authSuccess(res.data));
                dispatch(checkAuthTimeOut(+res.data.expiresIn));

                localStorage.setItem('idToken', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                
                const exprirationTime = new Date( new Date().getTime() + (+res.data.expiresIn * 1000) );
                localStorage.setItem('exprirationTime', exprirationTime);
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            });
    }
};



export const authCheckState = () => {
    return dispatch => {
        const idToken = localStorage.getItem('idToken');
        if (!idToken) {
            dispatch(authlogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('exprirationTime'));
            if (expirationDate <= new Date()) {
                dispatch(authlogout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess({idToken, localId: userId}));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};