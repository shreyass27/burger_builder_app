
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import ingredientReducer from './reducers/ingredients';
import orderReducer from './reducers/order';
import authReducer from './reducers/auth';

export default () => {
    const compomseEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  : null || compose;

    const rootReducer = combineReducers({
        ingredient: ingredientReducer,
        order: orderReducer,
        auth: authReducer
    });

    return createStore(rootReducer, compomseEnhancers(applyMiddleware(thunk)));
}
