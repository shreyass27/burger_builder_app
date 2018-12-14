import React, { Fragment, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auth from './containers/Auth/Auth';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

//  Lazy Loading Implemened Using Custom HOC Async Component
const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});

const asyncOrder = asyncComponent(() => {
    return import('./containers/Orders/Orders');
});


// React Provided Lazy Loading Implementation with Suspense Component
const AsyncLogout = React.lazy(() => import('./containers/Auth/Logout/Logout'));

const appRoutes = (props) => {

    // Public Routes
    let routesAccess = ( 
        <Switch>
            <Route path="/auth" component={Auth} />
            <Route exact path="/" component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>);

    // Private Routes if user is Authenticated
    if (props.isAuth) {
        routesAccess= (
            <Switch>
                {/* Custom HOC Lazy Loading */}
                <Route path="/checkout" component={asyncCheckout} />
                <Route path="/orders" component={asyncOrder} />

                {/* Lazy Loading with React and Suspense */}
                <Route path="/logout" render={() => (<Suspense fallback={<p>Loading...</p> } >   
                                                            <AsyncLogout /> 
                                                        </Suspense>
                                                    )} />
                                                    
                <Route path="/auth" component={Auth} />
                <Route exact path="/" component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );
    }
    return (
        <Fragment>
            {routesAccess}
        </Fragment>
    )

};

export default appRoutes;