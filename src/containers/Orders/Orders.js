import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import orderAxios from '../../axiosOrders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';



class Orders extends Component {
    state = {
        orders: [],
        loading: false
    }

    componentDidMount() {
        this.getOrders();
    }

    getOrders = () => {
        this.setState({loading: true});
        orderAxios('orders.json').then(
            response => {
                console.log('componentDidMount orders response', response);
                const fetchOrders = [];
                for ( let key in response.data) {
                    fetchOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                this.setState({
                    orders: fetchOrders,
                    loading: false
                })
            },
            console.log
        )
    }
    
    render() {
        let orderList = <Spinner />

        if (!this.state.loading) {
            orderList = this.state.orders.map(
                (order) => (<Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        totalPrice={+order.totalPrice}
                    />)
            )
        }

        return (
            <div>
                {orderList}
            </div>
        )
    }
}

export default withErrorHandler(Orders, orderAxios);