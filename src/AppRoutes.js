import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

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
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
                <Route path="/logout" component={Logout} />
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