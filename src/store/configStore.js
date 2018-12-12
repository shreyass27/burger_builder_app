
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import ingredientReducer from './reducers/ingredients';
import orderReducer from './reducers/order';
import authReducer from './reducers/auth';

export default () => {
    const compomseEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const rootReducer = combineReducers({
        ingredient: ingredientReducer,
        order: orderReducer,
        auth: authReducer
    });

    return createStore(rootReducer, compomseEnhancers(applyMiddleware(thunk)));
}
