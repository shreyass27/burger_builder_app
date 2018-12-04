 import React, { Fragment } from 'react';
 import classes from './Layout.scss';
 import ToolBar from '../Navigation/Toolbar/Toolbar';
 import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
 
 const Layout = (props) => (
     <Fragment>
        <div>
            <ToolBar />
            <SideDrawer />
            BackDrop
        </div>
        <main className={classes.mainContent}>
            {props.children}
        </main>
     </Fragment>
 );

 export default Layout;