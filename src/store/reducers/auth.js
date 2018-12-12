import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authSuccess = (state, action) => {
    
    const updateValues = {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    };

    return updateState(state, updateValues);
}

const authReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateState(state, { error: null, loading: true });
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return updateState(state, { error: action.error, loading: false  });
        case actionTypes.AUTH_LOGOUT:
            return updateState(state, { token: null, userId: null });

        default:
            return state;
    }
}

export default authReducer;