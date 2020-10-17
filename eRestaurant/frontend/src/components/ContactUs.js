import React from 'react';
import emailjs from 'emailjs-com';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


export default class ContactUs extends React.Component {
  constructor(props){
    super();
    this.state = {
      firstName:'',
      LastName:'',
      email:'',
      message:'',
      messageSent:false
    }
    this.setFirstName = this.setFirstName.bind(this);
    this.setLastName = this.setLastName.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.sendConfirmEmail = this.sendConfirmEmail.bind(this);

  }
  setFirstName(evt) {
    this.setState({
      firstName: evt.target.value
    })
  }
  setLastName(evt) {
    this.setState({
      lastName: evt.target.value
    })
  }
  setEmail(evt) {
    this.setState({
      email: evt.target.value
    })
  }
  setMessage(evt) {
    this.setState({
      message: evt.target.value
    })
  }
  closeMessageSent(){
    this.setState({
      messageSent:false
    })
  }
  sendConfirmEmail(){
    var service_id = "service_onar6eb";
    var template_id = "template_aldnmku";
    var user_id =  "user_y37OxRmCicn4obS3k4lV0";
    
    emailjs.send(service_id, template_id, this.state, user_id )
    .then((result) => {
    console.log('success',result.text);
    }, (error) => {
    console.log('error:', error);
    });
    this.setState({
      messageSent:true
    })
  
  }

  render(){
      return (
      <div>
        <Container maxWidth="sm">
        <Grid container spacing={2}>
                <Grid item xs={12} sm={6} >
                    <TextField 
                    id="Firstname" 
                    label="Firstname" 
                    variant="outlined" 
                    fullWidth
                    style = {{width: 267}}
                    onChange = {this.setFirstName}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="Lastname" 
                    label="Lastname" 
                    variant="outlined" 
                    fullWidth
                    style = {{width: 267}}
                    onChange = {this.setLastName}/>
                </Grid>
                <Grid item xs={12} >
                    <TextField
                    id="email Address"
                    label="Email Address"
                    placeholder="Please enter you email address."
                    fullWidth
                    variant="outlined"
                    onChange={this.setEmail}/>

                </Grid>
                <Grid item xs={12} rows={4}>
                <TextField 
                id="message" 
                label="Message"
                variant="outlined"
                fullWidth 
                multiline
                rows={6}
                onChange={this.setMessage}/>
                <Grid item xs={12} style={{marginTop:'10px'}} >
                <Button variant="outlined" onClick={this.sendConfirmEmail} fullWidth>Send Message</Button>
                </Grid>
            </Grid>
        </Grid>
        <Snackbar open={this.state.messageSent} autoHideDuration={6000} onClose={this.closeMessageSent}>
        <Alert onClose={this.closeMessageSent} severity="success">
           Your message has been recorded.
        </Alert>
      </Snackbar>
        </Container>
      </div>
      )
  }
}



