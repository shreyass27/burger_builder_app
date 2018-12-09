import React from 'react';
import classes from './Order.scss'

const Order = (props) => {
    const ingredients = [];
    for ( let ingredientName in props.ingredients) {
        ingredients.push(
            <span key={ingredientName} className={classes.Ingredients } >
                {ingredientName}({props.ingredients[ingredientName]})
            </span>
        )
    }

    return (
        <div className={classes.Order} >
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>USD {props.totalPrice.toFixed(2)}</strong></p>
        </div>
    )
}

export default Order;
