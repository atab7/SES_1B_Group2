import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles} from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { grey } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import {Link } from "react-router-dom";
import LogOut from './LogOut';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    Typography: {
        flexGrow:1,
    },
    Toolbar: {
        paddingRight: '0px',
    }
  }));
  
  const RegButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(grey[900]),
      backgroundColor: grey[800],
      '&:hover': {
        backgroundColor: grey[700],
        
      },
      height: "40px",
      width: "150px",
      padding: "10px",
      
      
    },
  }))(Button);

  const lrButtonGroup = withStyles((theme) => ({
      color: grey[500],
      marginLeft: "auto",
    marginRight: -12,
    }))(ButtonGroup);

  export default function ManagerNavBar() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
          <Paper square>
        <AppBar position="static" color="default" style={{marginBottom: '1px'}}>
        
          <Toolbar style={{ paddingRight:0 }}>
            <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ textDecoration: 'inherit', color: 'inherit'}}>Le Bistrot d'Andre </Link>
            </Typography>
            <Link to="/manageresturant" style={{ textDecoration: 'inherit', color: 'inherit'}}><Button color="inherit">Resturant</Button></Link>
            <Link to="/profile" style={{ textDecoration: 'inherit', color: 'inherit'}}><Button color="inherit">Profile</Button></Link>
            <LogOut/>
          </Toolbar>
          
        </AppBar>
        </Paper>
      </div>
    );
  }

