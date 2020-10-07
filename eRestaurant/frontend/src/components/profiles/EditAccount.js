import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {axios_config} from '../../config.js';

const useStyles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
});

class EditAccount extends React.Component {

  constructor(props){
    super();
    
    this.setFirstName = this.setFirstName.bind(this);
    this.setLastName = this.setLastName.bind(this);
    this.setPhone = this.setPhone.bind(this);
    this.setAddress = this.setAddress.bind(this);
    this.setEmail = this.setEmail.bind(this);

    this.state = {
      first_name: '',
      last_name:'',
      email:'',
      address:'',
      phone:'',
    }

  }

  setFirstName(evt){
    this.setState({
      first_name: evt.target.value
    });
  }

  setLastName(evt){
    this.setState({
      last_name: evt.target.value
    });
  }

  setEmail(evt){
    this.setState({
      email: evt.target.value
    });
  }

  setAddress(evt){
    this.setState({
      address: evt.target.value
    });
  }

  setPhone(evt){
    this.setState({
      phone: evt.target.value
    });
  }
  
  patchUserChanges(){

  }

  pathAccountChanges(){

  }

  patchChanges(data){
    const csrftoken = Cookies.get('csrftoken');
    axios.patch(`${axios_config["baseURL"]}api/manageRewards/${localStorage.getItem('username')}/remove-reward/`, 
    data,
    {
        headers:{ 
            'Authorization': `Token ${localStorage.getItem('auth_token')}`,
            'X-CSRFToken': csrftoken
        }
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
  }
  



  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <Container maxWidth="sm">
      <div>
        <TextField
          id="outlined-full-width"
          label="First Name"
          style={{ margin: 8 }}
          placeholder="Current First Name"
          onChange={this.setFirstName}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
   
        <TextField
          id="outlined-full-width"
          label="Last Name"
          style={{ margin: 8 }}
          placeholder="Current Last Name"
          onChange={this.setLastName}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Email Address"
          style={{ margin: 8 }}
          placeholder="hugh.jass@gmail.com"
          helperText="Confirmation Email Will Be Sent"
          onChange={this.setEmail}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Password"
          style={{ margin: 8 }}
          placeholder="*********"
          helperText="Choose a secure password"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label=" Re-Enter Password"
          style={{ margin: 8 }}
          placeholder="*********"
          helperText=""
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          
        />
       
        <TextField
          id="outlined-full-width"
          label="Residential Address"
          style={{ margin: 8 }}
          placeholder="Where u live :-)"
          onChange={this.setAddress}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Phone Number"
          style={{ margin: 8 }}
          placeholder="+61 123 456 890"
          margin="normal"
          onChange={this.setPhone}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <br></br>
        <Button variant="contained"
         margin="normal"
         style={{ margin: 8 }}
         
        >Confirm</Button>

        
      </div>
      </Container>
    </div>
    )
  }
}

export default withStyles(useStyles)(EditAccount);

/*
export default function LayoutTextFields() {
  const classes = useStyles();

  return (
    
  );
}

<TextField
label="Confirm Password"
id="outlined-margin-none"
defaultValue="Default Value"
className={classes.textField}
helperText="Some important text"
variant="outlined"
style = {{width: 260}}
/> */