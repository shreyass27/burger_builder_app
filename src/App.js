import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import AppRoutes from './AppRoutes';
class App extends Component {
  render() {
    return (
      <div>
          <Layout>
            <AppRoutes />
          </Layout>
      </div>
    );
  }
}

export default App;
