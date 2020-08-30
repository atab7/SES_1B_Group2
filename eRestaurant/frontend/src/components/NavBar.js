import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/ToolBar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles, makeStyles} from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { grey } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import {Link } from "react-router-dom";

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
      width: "150px"
    },
  }))(Button);

 

  const lrButtonGroup = withStyles((theme) => ({
      color: grey[500],
      marginLeft: "auto",
    marginRight: -12,
    }))(ButtonGroup);

  export default function NavBar() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
          <Paper square>
        <AppBar position="static" color="inherit">
        
          <Toolbar style={{ paddingRight:0 }}>
            <Typography variant="h6" className={classes.title}>
            <Link to="/">Le Bistrot d'Andre</Link>
            </Typography>
            
                <Link to="/login"><RegButton size="large">Login</RegButton></Link>
                <Link to="/register"><RegButton size="large">Register</RegButton></Link>
            
          </Toolbar>
          
        </AppBar>
        </Paper>
      </div>
    );
  }

