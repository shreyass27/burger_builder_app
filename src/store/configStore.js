
import { createStore, compose } from 'redux';

import reducer from '../reducers/ingredients';

export default () => {
    const compomseEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(reducer, compomseEnhancers())

    return store;
}
