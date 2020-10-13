import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
import axios from 'axios';
import {axios_config} from '../../config.js';
class ChangePassword extends React.Component {

    constructor(props){
      super();
  
      this.state = {
        currentPassword:'',
        newPassword:'',
        newPasswordRepeat:'',
      }
      this.setCurrentPassword = this.setCurrentPassword.bind(this);
      this.setNewPassword = this.setNewPassword.bind(this);
      this.setNewPasswordRepeat = this.setNewPasswordRepeat.bind(this);
    }
    setCurrentPassword(evt){
        this.setState({
          currentPassword: evt.target.value
        });
      }
    setNewPassword(evt){
        this.setState({
          newPassword: evt.target.value
    });
    }
    setNewPasswordRepeat(evt){
        this.setState({
          newPasswordRepeat: evt.target.value
        });
      }


    render(){
      return (
        <div >
        <Container maxWidth="sm">
        <div>
          <TextField
            id="outlined-full-width"
            label="Current Password"
            style={{ margin: 8 }}
            placeholder="Your Current Password"
            onChange={this.setCurrentPassword}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
     
          <TextField
            id="outlined-full-width"
            label="New Password"
            style={{ margin: 8 }}
            placeholder="Your New Password"
            onChange={this.setNewPassword}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-full-width"
            label="New Password Repeat"
            style={{ margin: 8 }}
            placeholder="Repeat New Password"
            onChange={this.setNewPasswordRepeat}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <Button variant="outlined" 
           fullWidth style={{marginLeft: '8px'}} >
               Confirm</Button>
        </div>
        </Container>
      </div>
      )
    }
  }
  
  export default (ChangePassword);