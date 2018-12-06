import React, { Component, Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            modalOpenState: false,
            error: null
        };

        closeModalHandler = () => {
            this.setState({ modalOpenState: false })
        }

        componentDidMount() {
            axios.interceptors.request.use(
                req => {
                    this.setState({
                        error: null
                    });
                    return req;
                }
            )
            axios.interceptors.response.use(
                res => res,
                error =>  {
                    this.setState({
                        error: error,
                        modalOpenState: true
                    });
                    return error;
                } 
            )
        }

        render() {
            return (
                <Fragment>
                    <Modal
                        onModalClose={this.closeModalHandler}
                        show={this.state.modalOpenState}>
                        { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props} />>
                </Fragment>
            )
        }
    }
}

export default withErrorHandler;