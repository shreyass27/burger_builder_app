import React, { Component, Fragment } from 'react'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import orderAxios from './../../axiosOrders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_CONST = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchaseState: false,
        loading: false,
        error: false
    };

    
    componentDidMount() {
        orderAxios.get('ingredients.json')
            .then(response => {
                    this.setState({ ingredients: response.data, error: false })
            })
            .catch( error => {
                this.setState({ error: true })
            });
    }

    updatePurchaseState() {
        const ingredients = {...this.state.ingredients};
        const sum = Object.keys(ingredients)
            .map( igKey => ingredients[igKey] )
            .reduce( (sum, ele) => sum + ele, 0 );
        
        this.setState({purchasable: sum > 0});
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
        // alert(' You Purchased the Buger');
        // const orderObject = {
        //     ingredients: this.state.ingredients,
        //     totalPrice: this.state.totalPrice,
        //     customer: {
        //         name: 'Max Schwarzmuller',
        //         address: {
        //             street:     'Teststreet 1',
        //             zipCode: '41351',
        //             country: 'Germany'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // };
        // this.setState({ loading: true });
        // orderAxios.post('/orders.json', orderObject)
        //     .then( (response) => {
        //         this.setState({ loading: false, purchaseState: false });
        //         console.log('purchaseContinueHandler response', response)
        //     })
        //     .catch(
        //         error => {
        //             console.log(error);
        //             this.setState({ loading: false });
        //         }
        //     );

        const queryParams = [];
        for ( let prpty in this.state.ingredients ) {
            queryParams.push(`${encodeURIComponent(prpty)}=${encodeURIComponent(this.state.ingredients[prpty])}`)
        }
        
            this.props.history.push({
                pathname: '/checkout',
                search: `?${queryParams.join('&')}`
            });
    }

    addIngredient = (type) => {
        this.setState( state => {
            const ingredientState = {...state.ingredients};
            ingredientState[type] = ingredientState[type] + 1;
            // this.updatePurchaseState(ingredientState);
            const totalPrice = state.totalPrice + INGREDIENT_CONST[type]
            return {
                ingredients: ingredientState,
                totalPrice
            };
        }, this.updatePurchaseState)
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
        }, this.updatePurchaseState)
    }

    render() {
        const disabledInfo = {...this.state.ingredients};

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]   <= 0;
        }

        let modalChild = null;
        let burgerComps = this.state.error ? <p> Ingredients Coould not be loaded </p> : <Spinner />;

        if (this.state.ingredients) {
            burgerComps = (
                <Fragment>
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

            modalChild = <OrderSummary
                            price={this.state.totalPrice}
                            cancelPurchase={this.purchaseCalcelhandler}
                            continuePurchase={this.purchaseContinueHandler}
                            ingredients={this.state.ingredients}  />
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
 
export default withErrorHandler(BurgerBuilder, orderAxios);