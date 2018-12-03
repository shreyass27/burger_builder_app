import React, { Component, Fragment } from 'react'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        totalPrice: 4
    }

    addIngredient = (type) => {
        this.setState( state => {
            const ingredientState = {...state.ingredients};
            ingredientState[type] = ingredientState[type] + 1;
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
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this.addIngredient}
                    removeIngredient={this.removeIngredient}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                />
            </Fragment>
        );
    }
}
 
export default BurgerBuilder;