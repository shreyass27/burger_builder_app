import React, { Component, Fragment } from 'react';
import classes from './Modal.scss';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        // Re-Renders Slef and Child OrderSummary Component only if "show" is changed
        return nextProps.show !== this.props.show ||
                nextProps.children !== this.props.children;
    }

    render() {
        return (
            <Fragment>
                <Backdrop click={this.props.onModalClose} show={this.props.show} />
                <div className={classes.Modal} 
                    style={{ transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                            opacity: this.props.show ? '1' : '0' }}>
                    { this.props.children }
                </div>
            </Fragment>
        );
    }
}

export default Modal;