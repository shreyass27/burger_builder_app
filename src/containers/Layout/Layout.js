 import React, { Component, Fragment } from 'react';
 import classes from './Layout.scss';
 import ToolBar from '../../components/Navigation/Toolbar/Toolbar';
 import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
 
 class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    toggleSideDrawer = () => {
        this.setState(prevState => {
            return { showSideDrawer : !prevState.showSideDrawer };
        });
    }
        

     render() {
         return (
            <Fragment>
                <div>
                    <ToolBar isAuth={this.props.isAuth} toggleSideDrawer={this.toggleSideDrawer} />
                    <SideDrawer
                        isAuth={this.props.isAuth}
                        isOpen={this.state.showSideDrawer}
                        closeSideBar={this.sideDrawerClosedHandler}
                    />
                    BackDrop
                </div>
                <main className={classes.mainContent}>
                    {this.props.children}
                </main>
            </Fragment>
         )
     }
 }

 const mapStateToProps = (state) => ({
    isAuth: state.auth.token !== null
 });

 export default connect(mapStateToProps)(Layout);