import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.scss';

const sideDrawer = (props) => {
    let assignedClasses = [ classes.SideDrawer, classes.Close ];

    if (props.isOpen) {
        assignedClasses = [ classes.SideDrawer, classes.Open ];
    }
    return (
        <Fragment>
            <Backdrop show={props.isOpen} click={props.closeSideBar} />
            <div className={assignedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>

    )
}

export default sideDrawer;