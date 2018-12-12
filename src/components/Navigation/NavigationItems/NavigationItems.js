import React, { Fragment } from 'react';
import classes from './NavigationItems.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems} >
        <NavigationItem link="/" >Burger builder</NavigationItem>
        {
            props.isAuth ?
            (<Fragment>
                <NavigationItem link="/orders" >Orders</NavigationItem>
                <NavigationItem link="/logout" >Log Out</NavigationItem>
            </Fragment>):
            (<NavigationItem link="/auth" >Authenticate</NavigationItem>)
        }
    </ul>
);

export default navigationItems;