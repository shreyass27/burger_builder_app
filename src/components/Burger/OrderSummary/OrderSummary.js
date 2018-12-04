import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

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
            <p> <strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p> Continue to Checkout ? </p>
            <Button clicked={props.cancelPurchase} btnType="Danger" >CANCEL</Button>
            <Button clicked={props.continuePurchase} btnType="Success" >CONTINUE</Button>
        </Fragment>
    );
 }

 export default orderSummary;