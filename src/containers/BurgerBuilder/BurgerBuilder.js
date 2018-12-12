import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import orderAxios from './../../axiosOrders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import { initIngredients, setAddIngredient, setRemoveIngredient } from '../../store/actions/ingredients';
import { purchaseInit } from '../../store/actions/order';

class BurgerBuilder extends Component {
    state = {
        purchaseState: false
    };

    
    componentDidMount() {
        this.props.onSetIngredients();
    }

    updatePurchaseState() {
        const ingredients = {...this.props.ingredients};
        const sum = Object.keys(ingredients)
            .map( igKey => ingredients[igKey] )
            .reduce( (sum, ele) => sum + ele, 0 );

        return sum > 0;
    }

    purchaseNow = () => {
        if (this.props.isAuth) {
            this.setState({ purchaseState: true });
        } else {
            this.props.onPurchaseInit();
            this.props.history.push({
                pathname: '/auth',
                search: '?redirectTo=checkout'
            });
        }
    }



    purchaseCalcelhandler = () => {
        this.setState({
            purchaseState: false
        });
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {...this.props.ingredients};

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]   <= 0;
        }

        let modalChild = null;
        let burgerComps = this.props.error ? <p> Ingredients Coould not be loaded </p> : <Spinner />;

        if (this.props.ingredients) {
            burgerComps = (
                <Fragment>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        addIngredient={this.props.onAddIngredients}
                        removeIngredient={this.props.onRemoveIngredients}
                        disabledInfo={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState()}
                        purchaseNow={this.purchaseNow}
                        isAuth={this.props.isAuth}
                    />
                </Fragment>
            );

            modalChild = <OrderSummary
                            price={this.props.totalPrice}
                            cancelPurchase={this.purchaseCalcelhandler}
                            continuePurchase={this.purchaseContinueHandler}
                            ingredients={this.props.ingredients}  />
        }

        return (
            <Fragment>
                <Modal 
                onModalClose={this.purchaseCalcelhandler}
                show={this.state.purchaseState}>
                    {modalChild}
                </Modal>
                {burgerComps}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    ingredients: state.ingredient.ingredients,
    totalPrice: state.ingredient.totalPrice,
    error: state.ingredient.error,
    isAuth: state.auth.token !== null
});
 

const mapDispatchToProps = (dispatch) => ({
    onSetIngredients: () => dispatch(initIngredients()),
    onAddIngredients: (ingredientName) => dispatch(setAddIngredient(ingredientName)),
    onRemoveIngredients: (ingredientName) => dispatch(setRemoveIngredient(ingredientName)),
    onPurchaseInit: () => (dispatch(purchaseInit()))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, orderAxios));