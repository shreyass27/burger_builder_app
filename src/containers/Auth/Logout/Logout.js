import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authlogout } from '../../../store/actions/auth';

class Logout extends Component {
    componentDidMount() {
        this.props.loggout();
    }

    render() {
        return (
            <Redirect to='/' /> 
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    loggout: () => dispatch(authlogout())
});

export default connect(undefined, mapDispatchToProps)(Logout)