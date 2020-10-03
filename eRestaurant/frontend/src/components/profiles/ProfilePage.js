import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import CustomerNavBar from '../CustomerNavBar';
import { withRouter } from 'react-router';
import {BrowserRouter as Router, Switch, Route, Link, BrowserRouter} from "react-router-dom";
//import About from './About';
import EditAccount from './EditAccount';
import Homepage from '../HomePage';
import Rewards from './Rewards';
import ManagerBooking from './ManagerBooking';
import AddStaff from './AddStaff';
import { isManager } from '../../actions/AuthCheck.js';

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

const setRewards = (classes) => {
  const user_type = localStorage.getItem('user_type');
  if(user_type === 'manager'){
    return (<Link to="/profile/Rewards" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <MailIcon/>
                </ListItemIcon>
                <ListItemText primary={"Manage Rewards"}/>
              </ListItem>  
            </Link>);
  }else if (user_type === 'customer'){
    return null;
  }
} 

const setBookings = (classes) => {
  const user_type = localStorage.getItem('user_type');
  if(user_type === 'manager'){
    return (<Link to="/profile/ManageBookings" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <MailIcon/>
                </ListItemIcon>
              <ListItemText primary={"Bookings"}/>
              </ListItem>  
            </Link>)
  }else if (user_type === 'customer'){
    return null;
  }
}

const setStaffManagement = (classes) => {
  const user_type = localStorage.getItem('user_type');
  if(user_type === 'manager'){
    return(
      <Link to="/profile/ManageStaff" className={classes.link}>
      <ListItem button>
        <ListItemIcon>
          <MailIcon/>
        </ListItemIcon>
        <ListItemText primary={"Manage Staff"}/>
      </ListItem>  
      </Link>
    )
  }
}

function ClippedDrawer() {

  const classes = useStyles();
  

  return (
    <div className={classes.root}>
      
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
            {setBookings(classes)}
            {setRewards(classes)}
            {setStaffManagement(classes)}
            <Link to="/profile/EditAccount" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <MailIcon/>
              </ListItemIcon>
              <ListItemText primary={"Edit Account"}/>
            </ListItem>  
            </Link>
            <Link to="/profile/Rewards" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <MailIcon/>
              </ListItemIcon>
              <ListItemText primary={"Rewards"}/>
            </ListItem>  
            </Link>
            <Link to="/profile/ManagerBooking" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <MailIcon/>
              </ListItemIcon>
              <ListItemText primary={"Booking"}/>
            </ListItem>  
            </Link>
            <Link to="/profile/ManagerStaff" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <MailIcon/>
              </ListItemIcon>
              <ListItemText primary={"Staff"}/>
            </ListItem>  
            </Link>
          </List>

        </div>
      </Drawer>
      
      <Switch>
        <Route exact path="/profile/EditAccount">
        <main className={classes.content}>
          <Toolbar/>
                <EditAccount/>
        </main>
        </Route>
        <Route exact path="/profile/Rewards">
        <main className={classes.content}>
          <Toolbar/>
                <Rewards/>
        </main>
        </Route>
        <Route exact path="/profile/ManageBookings">
        <main className={classes.content}>
          <Toolbar/>
                <ManagerBooking/>
        </main>
        </Route>
        <Route exact path="/profile/ManageStaff">
        <main className={classes.content}>
          <Toolbar/>
                <AddStaff/>
        </main>
        </Route>
      </Switch>
     
      
    </div>
  );
};
export default ClippedDrawer;

/*
Unusused Parts:
<Link to="/profile/banana" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <MailIcon/>
              </ListItemIcon>
              <ListItemText primary={"Home"}/>
            </ListItem>  
            </Link>
            <Link to="/profile/about" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <MailIcon/>
              </ListItemIcon>
              <ListItemText primary={"About"}/>
            </ListItem>  
            </Link>


            <Route exact path="/profile/banana">
        <main className={classes.content}>
          <Toolbar/>
                <About/>
                <Homepage/>
        </main>
        </Route>


  <Route exact path="/profile/about">
          
        </Route>


*/