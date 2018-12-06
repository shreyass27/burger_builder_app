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

        componentWillMount() {
            this.requestInterceptor = axios.interceptors.request.use(
                req => {
                    this.setState({
                        error: null
                    });
                    return req;
                },
                error => Promise.reject(error)
            );
            this.responseInterceptor = axios.interceptors.response.use(
                res => res,
                error =>  {
                    this.setState({
                        error: error,
                        modalOpenState: true
                    });
                    return Promise.reject(error);
                } 
            )
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }
        

        render() {
            return (
                <Fragment>
                    <Modal
                        onModalClose={this.closeModalHandler}
                        show={this.state.modalOpenState}>
                        { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            )
        }
    }
}

export default withErrorHandler;