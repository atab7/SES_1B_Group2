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
import CustomerNavBar from '../CustomerNavBar';
import { withRouter } from 'react-router';
import {BrowserRouter as Router, Switch, Route, Link, BrowserRouter} from "react-router-dom";
//import About from './About';
import Rewards from './Rewards';
import ManagerBooking from './ManagerBooking';
import AddStaff from './AddStaff';
import EditMenu from './EditMenu.js';

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
  

  return (
    <div className={classes.root}>
      <h1>test</h1>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
      <CustomerNavBar/>
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
};
