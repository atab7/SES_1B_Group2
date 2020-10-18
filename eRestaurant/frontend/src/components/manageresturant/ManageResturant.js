import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ManagerNavBar from '../ManagerNavBar.js';
import { withRouter } from 'react-router';
import {BrowserRouter as Router, Switch, Route, Link, BrowserRouter} from "react-router-dom";
//import About from './About';
import Rewards from './Rewards';
import ManagerBooking from './ManagerBooking';
import AddStaff from './AddStaff';
import EditMenu from './EditMenu.js';
import TodaysOrder from './TodaysOrder.js';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 'inherit',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    textDecoration: 'inherit', 
    color: 'inherit'},
}));


export default function ManageResturant() {

  const classes = useStyles();
  var user_type = localStorage.getItem('user_type');
  
if(user_type === 'manager')
{
  return (
    <div className={classes.root}>
      <h1>test</h1>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
      <ManagerNavBar/>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}>
        <Toolbar />
        <div className={classes.drawerContainer}>
         
          <List>
          <Link to="/manageresturant/TodaysOrder" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <MailIcon/>
                </ListItemIcon>
                <ListItemText primary={"Today's Orders"}/>
              </ListItem>  
            </Link>
          <Link to="/manageresturant/Rewards" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <MailIcon/>
                </ListItemIcon>
                <ListItemText primary={"Manage Rewards"}/>
              </ListItem>  
            </Link>
          <Link to="/manageresturant/ManagerBooking" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <MailIcon/>
                </ListItemIcon>
              <ListItemText primary={"Bookings"}/>
              </ListItem>  
            </Link>
          <Link to="/manageresturant/AddStaff" className={classes.link}>
            <ListItem button>
                <ListItemIcon>
                <MailIcon/>
                </ListItemIcon>
                <ListItemText primary={"Manage Staff"}/>
            </ListItem>  
            </Link>
            <Link to="/manageresturant/EditMenu" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <MailIcon/>
                </ListItemIcon>
              <ListItemText primary={"Edit Menu"}/>
              </ListItem>  
            </Link>
          </List>

        </div>
      </Drawer>
      
      <Switch>
        <Route exact path="/manageresturant/TodaysOrder">
        <main className={classes.content}>
          <Toolbar/>
                <TodaysOrder/>
        </main>
        </Route>
        <Route exact path="/manageresturant/EditMenu">
        <main className={classes.content}>
          <Toolbar/>
                <EditMenu/>
        </main>
        </Route>
        <Route exact path="/manageresturant/Rewards">
        <main className={classes.content}>
          <Toolbar/>
                <Rewards/>
        </main>
        </Route>
        <Route exact path="/manageresturant/ManagerBooking">
        <main className={classes.content}>
          <Toolbar/>
                <ManagerBooking/>
        </main>
        </Route>
        <Route exact path="/manageresturant/AddStaff">
        <main className={classes.content}>
          <Toolbar/>
                <AddStaff/>
        </main>
        </Route>
      </Switch>
     
      
    </div>
  );

}else if(user_type === 'staff'){
  return (
    <div className={classes.root}>
      <h1>test</h1>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
      <ManagerNavBar/>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}>
        <Toolbar />
        <div className={classes.drawerContainer}>
         
          <List>
          <Link to="/manageresturant/TodaysOrder" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <MailIcon/>
                </ListItemIcon>
                <ListItemText primary={"Today's Orders"}/>
              </ListItem>  
            </Link>

            </List>

        </div>
    </Drawer>

    <Switch>
        <Route exact path="/manageresturant/TodaysOrder">
        <main className={classes.content}>
          <Toolbar/>
                <TodaysOrder/>
        </main>
        </Route>
    
    </Switch>
        
     </div>

  );
}else{
  return(
    [
    <h1>ILLEGAL ACCESS ATTEMPT DETECTED! </h1>,
    <p>You don't have the right user privileges to 
      access this page. Please leave.
    </p>
    ]
  )
}
};
