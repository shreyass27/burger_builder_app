import React, { Component, Fragment } from 'react'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_CONST = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchaseMode: false
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map( igKey => ingredients[igKey] )
            .reduce( (sum, ele) => sum + ele, 0 );
        
        this.setState({purchasable: sum > 0});
    }

    purchaseNow() {
        this.setState({
            purchaseMode: true
        });
    }

    addIngredient = (type) => {
        this.setState( state => {
            const ingredientState = {...state.ingredients};
            ingredientState[type] = ingredientState[type] + 1;
            this.updatePurchaseState(ingredientState);
            const totalPrice = state.totalPrice + INGREDIENT_CONST[type]
            return {
                ingredients: ingredientState,
                totalPrice
            };
        })
    }
    
    removeIngredient = (type) => {
        this.setState( state => {
            const ingredientState = {...state.ingredients};
            if ( ingredientState[type] > 0 ) {
                ingredientState[type] =  ingredientState[type]  - 1;
                this.updatePurchaseState(ingredientState);
    
                const totalPrice = state.totalPrice - INGREDIENT_CONST[type]
                return {
                    ingredients: ingredientState,
                    totalPrice
                };
            }
        })
    }

    render() {
        const disabledInfo = {...this.state.ingredients};

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]   <= 0;
        }
        return (
            <Fragment>
                <Modal show={this.state.purchaseMode}>
                    <OrderSummary ingredients={this.state.ingredients}  />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this.addIngredient}
                    removeIngredient={this.removeIngredient}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchaseNow={this.purchaseNow}
                />
            </Fragment>
        );
    }
}
 
export default BurgerBuilder;