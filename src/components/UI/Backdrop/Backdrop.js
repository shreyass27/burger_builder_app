import React from 'react';
import classes from './Backdrop.scss';

const backDrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.click} ></div> : null
);

export default backDrop;