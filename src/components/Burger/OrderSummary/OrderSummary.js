import React, { Fragment } from 'react';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
    .map( 
        igKey => (<li key={igKey} >
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span> : {props.ingredients[igKey]}
        </li>)
    )

    return (
        <Fragment>
            <h3> Your Order </h3>
            <p>A Delicious Burger with following ingredients</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p> Continue to Checkout ? </p>
        </Fragment>
    );
 }

 export default orderSummary;