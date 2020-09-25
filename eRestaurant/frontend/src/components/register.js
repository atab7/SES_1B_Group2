import React from 'react';
import NavBar from './NavBar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from 'axios';


import Background from './images/defaultBackground.jpg';
import {Link } from "react-router-dom";

import {axios_config} from '../config.js';
axios.interceptors.request.use(req => {
  console.log(`${req.method} ${req.url}`);
  // Important: request interceptors **must** return the request.
  return req;
});


  var backgroundImg = {
    width: "100%",
    height: "900px",
    backgroundImage: `url(${Background})`
  };
  
  const PaperForm = withStyles((theme) => ({
    root: {
        background: '#FFFFFF',
    },

  }))(Paper);

  

const post_user = (Email, Password) => {
  const user_exist = check_user(Email);
  const password_valid = check_password(Password);
  
  if(!user_exist && password_valid) {
    axios.post(`${axios_config["baseURL"]}/auth/users/`,
    {
      email: Email,
      username: Email,
      password: Password
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  } else if (user_exist){
    console.log('User exists!');
  } else if (!password_valid) {
    console.log("Password not strong enough!")
  }

}

const check_user = (email) => {
  return false;
}

const check_password = (password) => {
  return true;
}


//rigth way of exporting 
export default class Register extends React.Component { 
  
  constructor(props){
    super();

    this.state = {
      username:'',
      password:'',
      repeat_password:'',
      firstname:'',
      lastname:''
    }

    this.handleClick = this.handleClick.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setRepeatPassword = this.setRepeatPassword.bind(this);
  }

  setUsername(evt) {
    this.setState({
      username: evt.target.value
    })
  }

  setPassword(evt){
    this.setState({
      password: evt.target.value
    })
  }

  setRepeatPassword(evt){
    this.setState({
      repeat_password: evt.target.value
    })
  }

  postUser(){
    axios.post(`${axios_config["baseURL"]}auth/users/`,
    {
      email: this.state.username,
      username: this.state.username,
      password: this.state.password
    },
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      if(error.response.data.username){
        if(error.response.data.username.length >= 1){
          if(error.response.data.username[0] === "A user with that username already exists."){
            console.log("User Exists. Please try again with a different email or recover password.");
          }
        }
      }
    });

  }

  checkEmail(email){
    var re = /\S+@\S+\.\S+/;
    return re.test(email); 
  }

  checkPassword(password){
    var passFormat = new RegExp("^((?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.{8,}))");
    return passFormat.test(password);
  }

   handleClick (evt) {
    var isValidPass = this.checkPassword(this.state.password);
    var isValidEmail = this.checkEmail(this.state.username);
    var isSamePass = this.state.repeat_password === this.state.password;

    if(isValidEmail && isValidPass && isSamePass){
      this.postUser();
    }else if(!isValidEmail){
      console.log("Invalid Email address. Please try again.")
    }else if(!isValidPass){
      console.log("Invalid Password. Please make sure your password contains 1 upper case letter, 1 lower case letter, minimum 8 characters and contains at least one number!");
    }else if(!isSamePass){
      console.log("Passwords dont match, please try again!");
    }

  }

  render(){
    return (
      <div style={ this.backgroundImg }>
            <NavBar/>
            <Container maxWidth="sm" style = {{marginTop: '100px'}}>
            <PaperForm variant="outlined">
                <form>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Paper>Register
                </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="Firstname"  label="Firstname" variant="outlined" onChange = {e => this.setFirstName(e)} />
                </Grid>
                <Grid item xs={12} sm={6}>
  
                    <TextField id="Lastname" label="Lastname" variant="outlined" onChange = {e => this.setLastName(e)}/>
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                    <TextField
                    id="username"
                    label="Email Adress"
                    placeholder="Calvin@gmail.com"
                    onChange = {e => this.setUsername(e)}
                    fullWidth
                    variant="outlined"/>
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                <TextField 
                id="password" 
                label="Password" 
                variant="outlined"
                onChange = {e => this.setPassword(e)} 
                fullWidth 
                helperText="Do Not Share Your Password With Anyone"/>
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                <TextField id="outlined-basic" label="Password Repeat" variant="outlined" onChange = {e => this.setRepeatPassword(e)}fullWidth/>
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                <Button variant="outlined" onClick={this.handleClick} fullWidth>Register</Button>
                <p>Already have an account? <Link to="/login">Sign-In Here</Link></p>
                </Grid>

                
            </Grid>
            </form>
            </PaperForm>
            </Container>
    </div>
    )
  }
}
/*
const Register = () => {
    const classes = useStyles();
    return(
        <div className={classes.root} style={ backgroundImg }>
            <NavBar/>
            <Container maxWidth="sm" style = {{marginTop: '100px'}}>Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons: 1. You might have mismatching versions of R
            <PaperForm variant="outlined">
                <form>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Paper className={classes.paper}>Register
                </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="outlined-basic" label="Firstname" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
  
                    <TextField id="outlined-basic" label="Lastname" variant="outlined" />
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                    <TextField
                    id="email"
                    label="Email Adress"
                    placeholder="Calvin@gmail.com"
                    fullWidth
                    variant="outlined"/>
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                <TextField 
                id="outlined-basic" 
                label="Password" 
                variant="outlined" 
                fullWidth 
                helperText="Do Not Share Your Password With Anyone"/>
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                <TextField id="outlined-basic" label="Password Repeat" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                <Button variant="outlined" fullWidth>Register</Button>
                <p>Already have an account? <Link to="/login">Sign-In Here</Link></p>
                </Grid>

                
            </Grid>
            </form>
            </PaperForm>
            </Container>
    </div>
    )

}
export default Register;
*/



