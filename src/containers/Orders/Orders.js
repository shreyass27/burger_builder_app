import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import orderAxios from '../../axiosOrders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { fetchOrders } from '../../store/actions/order';



class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {
        let orderList = <Spinner />

        if (!this.props.loading) {
            orderList = this.props.orders.map(
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

const mapStateToProps = (state) => ({
    orders: state.order.orders,
    loading: state.order.loading
});

const mapDispatchToProps = (dispatch) => ({
    fetchOrders: () => dispatch(fetchOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, orderAxios));