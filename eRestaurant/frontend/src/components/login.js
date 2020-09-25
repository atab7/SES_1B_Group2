
import React from 'react';
import NavBar from './NavBar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Background from './images/defaultBackground.jpg';
import {Link } from "react-router-dom";



const PaperForm = withStyles((theme) => ({
  root: {
      background: '#FFFFFF',
  },

}))(Paper);


var backgroundImg = {
  width: "100%",
  height: "900px",
  backgroundImage: `url(${Background})`
};

export default class Login extends React.Component {
  constructor(props){
    super();
  }
  render(){
    return (
      <div style={ backgroundImg }>
            <NavBar/>
            <section >
            <Container maxWidth="sm" style = {{marginTop: '100px'}}>
            <PaperForm variant="outlined">
                <form>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                
                    <p style={{textAlign: 'center'}}>Le Bistrod d'Andre</p>
                    <p  style={{textAlign: 'center'}}>Sign In</p>
                
                </Grid>

                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                
                    <TextField
                    placeholder="Calvin@gmail.com"
                    fullWidth
                    id="email" 
                    label="Email Address" 
                    variant="outlined" />
                
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                <TextField 
                id="outlined-basic" 
                label="Password" 
                variant="outlined" 
                fullWidth helperText="Forgot Password?"/>
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                <Button variant="outlined" style ={{color:'#424242'}} fullWidth>Sign in</Button>
                <p>Dont Have an Account? <Link to="/register">Register Here</Link></p>
                </Grid>

                
            </Grid>
            </form>
            </PaperForm>
            </Container>
            </section>
    </div>
    )
}
}

/*
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  const PaperForm = withStyles((theme) => ({
    root: {
        background: '#FFFFFF',
    },

  }))(Paper);


  var backgroundImg = {
    width: "100%",
    height: "900px",
    backgroundImage: `url(${Background})`
  };

const Login = () => {
    const classes = useStyles();
    return(
        <div className={classes.root} style={ backgroundImg }>
            <NavBar/>
            <section >
            <Container maxWidth="sm" style = {{marginTop: '100px'}}>
            <PaperForm variant="outlined">
                <form>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                
                    <p style={{textAlign: 'center'}}>Le Bistrod d'Andre</p>
                    <p  style={{textAlign: 'center'}}>Sign In</p>
                
                </Grid>

                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                
                    <TextField
                    placeholder="Calvin@gmail.com"
                    fullWidth
                    id="email" 
                    label="Email Address" 
                    variant="outlined" />
                
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                <TextField 
                id="outlined-basic" 
                label="Password" 
                variant="outlined" 
                fullWidth helperText="Forgot Password?"/>
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                <Button variant="outlined" style ={{color:'#424242'}} fullWidth>Sign in</Button>
                <p>Dont Have an Account? <Link to="/register">Register Here</Link></p>
                </Grid>

                
            </Grid>
            </form>
            </PaperForm>
            </Container>
            </section>
    </div>
    )

}
*/