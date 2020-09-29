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
                <ListItemText primary={"Rewards"}/>
              </ListItem>  
            </Link>);
  }else if (user_type === 'customer'){
    return null;
  }else{
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
  }else{
    return null;
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
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
         
          <List>
            {setBookings(classes)}
            {setRewards(classes)}
            <Link to="/profile/editAccount" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <MailIcon/>
              </ListItemIcon>
              <ListItemText primary={"Edit Account"}/>
            </ListItem>  
            </Link>
          </List>
        </div>
      </Drawer>
      
      <Switch>
        <Route exact path="/profile/editAccount">
        <main className={classes.content}>
          <Toolbar/>
                <EditAccount/>
        </main>
        </Route>
        <Route exact path="/profile/rewards">
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