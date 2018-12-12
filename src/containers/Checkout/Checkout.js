import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />

        if (this.props.ingredients && this.props.isPurchasing) {
        summary = ( <Fragment>
                        <CheckoutSummary 
                            checkoutCancelled={this.checkoutCancelledHandler}
                            checkoutContinued={this.checkoutContinuedHandler}
                            ingredients={this.props.ingredients} 
                        />
                        <Route 
                            path={`${this.props.match.path}/contact-data`}exact 
                            component={ContactData} 
                        />
                    </Fragment> );
        }

        return ( 
            <div>
                {summary}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ingredients: state.ingredient.ingredients,
    totalPrice: state.ingredient.totalPrice,
    isPurchasing: state.order.isPurchasing
});

export default connect(mapStateToProps)(Checkout);