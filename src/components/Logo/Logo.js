import React from 'react';
import burgerLogo from '../../assets/burger-logo.png';
import classes from './Logo.scss';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="Burger Logo, Don't Eat it" />
    </div>
);

export default logo;