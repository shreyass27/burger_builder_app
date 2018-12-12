import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import AppRoutes from './AppRoutes';
import { authCheckState } from './store/actions/auth';
class App extends Component {
  
  componentDidMount() {
    this.props.authCheck();  
  }

  render() {
    return (
      <div>
          <Layout>
            <AppRoutes isAuth={this.props.isAuth} />
          </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.token !== null
});

const mapDispatchToProps = (dispatch) => ({
  authCheck: () => dispatch(authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
