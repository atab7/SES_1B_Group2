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
import ChangePassword from './ChangePassword';
import Homepage from '../HomePage';
import Rewards from './Rewards';
import ManagerBooking from './ManagerBooking';
import AddStaff from './AddStaff';
import { isManager } from '../../actions/AuthCheck.js';
import CustomerBooking from './CustomerBooking';
import EditMenu from './EditMenu.js';
import ManagerNavBar from '../ManagerNavBar.js';

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
    return (<Link to="/profile/ManagerBooking" className={classes.link}>
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
      <Link to="/profile/AddStaff" className={classes.link}>
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

const setCustomerBookings = (classes) => {
  const user_type = localStorage.getItem('user_type');
  if(user_type === 'customer'){
    return (<Link to="/profile/CustomerBooking" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <MailIcon/>
                </ListItemIcon>
              <ListItemText primary={"View Bookings"}/>
              </ListItem>  
            </Link>)
  }else if (user_type === 'manager'){
    return null;
  }
}
const setEditMenu = (classes) => {
  const user_type = localStorage.getItem('user_type');
  if(user_type === 'manager'){
    return (<Link to="/profile/EditMenu" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <MailIcon/>
                </ListItemIcon>
              <ListItemText primary={"Edit Menu"}/>
              </ListItem>  
            </Link>)
  }else if (user_type === 'customer'){
    return null;
  }
}

const setNavBar = () => {
  const user_type = localStorage.getItem('user_type');
  if(user_type === 'manager' || user_type === 'staff'){
    return (<ManagerNavBar/>);
  }else{
    return (<CustomerNavBar/>);
  }
}

function ClippedDrawer() {

  const classes = useStyles();
  

  return (
    <div className={classes.root}>
      
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
      {setNavBar()}
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
            <Link to="/profile/EditAccount" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <MailIcon/>
              </ListItemIcon>
              <ListItemText primary={"Edit Account"}/>
            </ListItem>  
            </Link>
            <Link to="/profile/ChangePassword" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <MailIcon/>
              </ListItemIcon>
              <ListItemText primary={"Change Password"}/>
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
            {setCustomerBookings(classes)}
          </List>

        </div>
      </Drawer>
      
      <Switch>
        <Route exact path="/profile/EditMenu">
        <main className={classes.content}>
          <Toolbar/>
                <EditMenu/>
        </main>
        </Route>
        <Route exact path="/profile/CustomerBooking">
        <main className={classes.content}>
          <Toolbar/>
                <CustomerBooking/>
        </main>
        </Route>
        <Route exact path="/profile/EditAccount">
        <main className={classes.content}>
          <Toolbar/>
                <EditAccount/>
        </main>
        </Route>
        <Route exact path="/profile/ChangePassword">
        <main className={classes.content}>
          <Toolbar/>
                <ChangePassword/>
        </main>
        </Route>
        <Route exact path="/profile/Rewards">
        <main className={classes.content}>
          <Toolbar/>
                <Rewards/>
        </main>
        </Route>
        <Route exact path="/profile/ManagerBooking">
        <main className={classes.content}>
          <Toolbar/>
                <ManagerBooking/>
        </main>
        </Route>
        <Route exact path="/profile/AddStaff">
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