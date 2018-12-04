 import React, { Component, Fragment } from 'react';
 import classes from './Layout.scss';
 import ToolBar from '../../components/Navigation/Toolbar/Toolbar';
 import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
 
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
                <ToolBar toggleSideDrawer={this.toggleSideDrawer} />
                <SideDrawer
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

 export default Layout;