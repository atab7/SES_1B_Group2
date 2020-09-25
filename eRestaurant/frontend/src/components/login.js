
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
import { connect } from 'react-redux';


import axios from 'axios';
import {axios_config} from '../config.js';

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
    if(props.isIllegal){
      this.isIllegal = true;
    }

    this.state = {
      username: '',
      password:'',
      auth_token:''
    }

    this.setUsername = this.setUserName.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setToken = this.setToken.bind(this);
  }

  setUserName(evt){
    this.setState({
      username: evt.target.value
    })
  }

  setPassword(evt){
    this.setState({
      password: evt.target.value
    }
    )
  }

  setToken(){
    axios.post(`${axios_config["baseURL"]}auth/token/login/`,
    {
      username: this.state.username,
      password: this.state.password
    },
    )
    .then((response) => {
      sessionStorage.setItem('auth_token', response.data.auth_token);
    })
    .catch((error) => {
      if(error.response.data.non_field_errors){
        if(error.response.data.non_field_errors.length >= 1){
          if(error.response.data.non_field_errors[0] === "Unable to log in with provided credentials."){
            console.log("Username or password incorrect. Please try again.");
          }
        }
      }
    });
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
                    onChange = {e => this.setUserName(e)}
                    variant="outlined" />
                
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                <TextField 
                id="outlined-basic" 
                label="Password" 
                variant="outlined" 
                onChange = {e => this.setPassword(e)}
                fullWidth helperText="Forgot Password?"/>
                </Grid>
                <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                <Button variant="outlined" style ={{color:'#424242'}} onClick={this.setToken} fullWidth>Sign in</Button>
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
