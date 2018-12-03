 import React, { Fragment } from 'react';
 import classes from './Layout.scss';
 
 const Layout = (props) => (
     <Fragment>
        <div>
            ToolBar,
            SideBAr,
            BackDrop
        </div>
        <main className={classes.mainContent}>
            {props.children}
        </main>
     </Fragment>
 );

 export default Layout;