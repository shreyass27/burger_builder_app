import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import orderAxios from './../../axiosOrders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import { setIngredients, setAddIngredient, setRemoveIngredient } from '../../actions/ingredients';

const INGREDIENT_CONST = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
};

class BurgerBuilder extends Component {
    state = {
        purchaseState: false,
        loading: false,
        error: false
    };

    
    componentDidMount() {
        // orderAxios.get('ingredients.json')
        //     .then(response => {
        //             this.setState({ ingredients: response.data, error: false })
        //     })
        //     .catch( error => {
        //         this.setState({ error: true })
        //     });
    }

    updatePurchaseState() {
        const ingredients = {...this.props.ingredients};
        const sum = Object.keys(ingredients)
            .map( igKey => ingredients[igKey] )
            .reduce( (sum, ele) => sum + ele, 0 );

        return sum > 0;
    }

    purchaseNow = () => {
        this.setState({
            purchaseState: true
        });
    }



    purchaseCalcelhandler = () => {
        this.setState({
            purchaseState: false
        });
    }

    purchaseContinueHandler = () => {
        // this.props.onSetIngredients(this.props.ingredients);
            this.props.history.push({
                pathname: '/checkout',
            });
    }

    render() {
        const disabledInfo = {...this.props.ingredients};

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]   <= 0;
        }

        let modalChild = null;
        let burgerComps = this.state.error ? <p> Ingredients Coould not be loaded </p> : <Spinner />;

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
                    />
                </Fragment>
            );

            modalChild = <OrderSummary
                            price={this.props.totalPrice}
                            cancelPurchase={this.purchaseCalcelhandler}
                            continuePurchase={this.purchaseContinueHandler}
                            ingredients={this.props.ingredients}  />
        }
        
        if (this.state.loading) {
            modalChild = <Spinner />;
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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
});
 

const mapDispatchToProps = (dispatch) => ({
    onSetIngredients: (ingredients) => dispatch(setIngredients(ingredients)),
    onAddIngredients: (ingredientName) => dispatch(setAddIngredient(ingredientName)),
    onRemoveIngredients: (ingredientName) => dispatch(setRemoveIngredient(ingredientName))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, orderAxios));