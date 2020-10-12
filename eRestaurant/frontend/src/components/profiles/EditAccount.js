import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
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
    this.sendChanges = this.sendChanges.bind(this);

    this.state = {
      first_name: '',
      last_name:'',
      email:'',
      address:'',
      phone:'',
      curr_address: '',
      curr_phone: '',
      current_user_data: {
        first_name: '',
        last_name:'',
        email:''
      },
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
  
  getCurrentAccountData(user_type){
    var endpoint = '';
    if(user_type === 'customer'){
      endpoint = 'customer';
    }else if (user_type === 'manager' || user_type === 'manager'){
      endpoint = 'staff';
    }
    
    if(endpoint !== ''){
      axios.get(`${axios_config["baseURL"]}api/${endpoint}/`, 
      {
        headers:{ 
            'Authorization': `Token ${localStorage.getItem('auth_token')}`,
        }
      })
      .then((response) => {
        this.setState({
          curr_address: response.data[0].address,
          curr_phone: response.data[0].phone_number
        })
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  getCurrentUserData(){
    axios.get(`${axios_config["baseURL"]}api/user/`, {
      headers:{ 
          'Authorization': `Token ${localStorage.getItem('auth_token')}`,
      }
    })
    .then((response) => {
      console.log(response);
      this.setState({
        current_user_data:{
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email
        }
      })
        
    })
    .catch((error) => {
      console.log(error);
    })
  }

  componentDidMount(){
    this.getCurrentAccountData(localStorage.getItem('user_type'));
    this.getCurrentUserData();
    console.log(this.state.current_account_data);
  }

  createJSONData(endpoint){
    
    var include = {};
    if(endpoint === 'user'){
      include = {first_name:true, last_name:true, email:true, address: false, phone: false};
    }else if(endpoint === 'account'){
      include = {first_name:false, last_name:false, email:false, address: true, phone: true};
    }

    var data = {};
    for(const property in this.state){
      let include_state = false;
      try{
        include_state = include[property];
      }catch{};

      if(this.state[property] !== '' && include_state){
        data[property] = this.state[property];
      }
    }
    return data;

  }

  patchAccountChanges(){
    var user_type = localStorage.getItem('user_type');
    var data = this.createJSONData('account');
    if(Object.keys(data).length !== 0){
      if(user_type === 'manager' || user_type === 'staff'){
        this.patchChanges(data, 'edit-staff');
      }else if(user_type === 'customer'){
        this.patchChanges(data, 'edit-customer');
      }
    }

  }

  patchUserChanges(){
    var data = this.createJSONData('user');
    if(Object.keys(data).length !== 0){
      this.patchChanges(data, 'edit-user')
    }
  }

  patchChanges(data, api_url){
    const csrftoken = Cookies.get('csrftoken');
    axios.post(`${axios_config["baseURL"]}api/${api_url}/`, 
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
      if(error.response.status === 406){
        alert('Email already exists!');
      }
    });
  }
  
  sendChanges(){
    this.patchUserChanges();
    this.patchAccountChanges();
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
          placeholder={this.state.current_user_data.first_name}
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
          placeholder={this.state.current_user_data.last_name}
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
          placeholder={this.state.current_user_data.email}
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
          label="Residential Address"
          style={{ margin: 8 }}
          placeholder={this.state.curr_address}
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
          placeholder={this.state.curr_phone}
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
         onClick={this.sendChanges}
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