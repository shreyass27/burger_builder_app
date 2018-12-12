import React from 'react';
import classes from './BuildControls.scss';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const buildControls = (props) => (
    <div className={classes.BuildControls} >
        <p> Curent Price: <strong>{props.price.toFixed(2)}</strong></p>
        {
            controls.map(
                ctrl => (
                    <BuildControl
                    key={ctrl.label} 
                    label={ctrl.label}
                    addIngredient={() => props.addIngredient(ctrl.type)}
                    removeIngredient={() => props.removeIngredient(ctrl.type)}
                    disabled={props.disabledInfo[ctrl.type]}
                    />
                )    
            )
        }

        <button 
            disabled={!props.purchasable}
            className={classes.OrderButton}
            onClick={props.purchaseNow}
        > {props.isAuth ? 'ORDER NOW' : 'SIGNUP TO ORDER '} </button>
    </div>
);

export default buildControls;