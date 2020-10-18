
import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Cookies from 'js-cookie';
import axios from 'axios';
import {axios_config} from '../../config.js';


export default class AddStaff extends React.Component {
    constructor(props){
      super();

      this.state = {
        username:'',
        password:'',
        first_name:'',
        last_name:'',
        number:'',
        address:'',
        role:''
      };

      this.setFirstName = this.setFirstName.bind(this);
      this.setLastName = this.setLastName.bind(this);
      this.setUsername = this.setUsername.bind(this);
      this.setPassword = this.setPassword.bind(this);
      this.setNumber = this.setNumber.bind(this);
      this.setAddress = this.setAddress.bind(this);
      this.setRole = this.setRole.bind(this);
      this.postStaff = this.postStaff.bind(this);
    }

    setRole(evt){
        this.setState({
            role: evt.target.value
        });
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

    setUsername(evt){
        this.setState({
            username: evt.target.value
        });
    }

    setPassword(evt){
        this.setState({
            password: evt.target.value
        });
    }

    setNumber(evt){
        this.setState({
            number: evt.target.value
        });
    }

    setAddress(evt){
        this.setState({
            address: evt.target.value
        })
    }

    fieldChecks(){
        if(!this.state.username || !this.state.password || !this.state.number || !this.state.address || !this.state.first_name || !this.state.last_name || !this.state.role){
            alert("Please fill all the fields!");
            return false;
        }

        var re = /\S+@\S+\.\S+/;
        if(!re.test(this.state.username)){
            alert("Please enter an email in correct form. Example: example@example.com");
            return false;
        }
        
        var passFormat = new RegExp("^((?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.{8,}))");
        if(!passFormat.test(this.state.password)){
            alert("Please make sure the password is at least 8 characters, includes 1 cupper-case, 1 lower-case letter and 1 number");
            return false;
        }

        return true;
    }

    postStaff(){
        if(this.fieldChecks()){
            var csrftoken = Cookies.get('csrftoken');
            axios.post(`${axios_config["baseURL"]}auth/users/`,
            {
                username: this.state.username,
                email: this.state.username,
                password: this.state.password
            },
            {
                headers: {
                  'X-CSRFToken': csrftoken
                }
            }
            )
            .then((response) => {
                this.createStaffAccount();
            })
            .catch((error) => {
            })
        }
    }

    saveNames(token){
        var csrftoken = Cookies.get('csrftoken');
        axios.post(`${axios_config["baseURL"]}api/edit-user/`, 
        {
        
        },
        {
            headers:{ 
                'Authorization': `Token ${token}`,
                'X-CSRFToken': csrftoken
            }
        })
        .then((response) => {
        //console.log("save name response: ", response);
        })
        .catch((error) => {
        //console.log("initUser error: ", error);
        })
    }

    createStaffAccount(){
        var csrftoken = Cookies.get('csrftoken');
        axios.post(`${axios_config["baseURL"]}api/staff/`,{
            number: this.state.number,
            address: this.state.address,
            username: this.state.username,
            first_name: this.state.first_name,
            last_name: this.state.last_name
        },
        {
            headers:{ 
                'Authorization': `Token ${localStorage.getItem('auth_token')}`,
                'X-CSRFToken': csrftoken
            }
        })
        .then((response) => {
            alert(`An account for ${this.state.first_name} ${this.state.last_name} created.`);
        })
        .catch((error) => {
        //console.log("create customer account error: ", error);
        });
    }



    render(){
        return(
            <div>
                <Container maxWidth="sm">
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{height:80}}>
                     <b><p  style={{textAlign: 'center', fontSize:'24px'}}>Create A Staff Account</p></b>
                    </Grid>
                    <Grid item xs={12} sm={6}  style={{paddingLeft: '24px'}}>
                    <TextField
                        placeholder="First Name"
                        fullWidth
                        id="staffFN" 
                        label="First Name"
                        onChange={this.setFirstName} 
                        style = {{width: 252}}
                        variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        placeholder="Last name"
                        fullWidth
                        id="staffLN" 
                        style = {{width: 252}}
                        label="Last Name"
                        onChange={this.setLastName}
                        variant="outlined" />
                    </Grid>
                    <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                    <TextField
                        placeholder="example@email.com"
                        fullWidth
                        id="staffEmail" 
                        label="Email Address" 
                        onChange={this.setUsername}
                        variant="outlined" />
                    </Grid>
                    <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                    <TextField
                        fullWidth
                        id="staffPassword"
                        label="Password" 
                        type="password"
                        onChange={this.setPassword}
                        variant="outlined" />
                    </Grid>
                    <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                    <TextField
                        placeholder="Chef, Waiter etc."
                        fullWidth
                        id="staffRole" 
                        label="Role"
                        onChange={this.setRole} 
                        variant="outlined" />
                    </Grid>
                    <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                    <TextField
                        placeholder="Mobile number"
                        fullWidth
                        id="staffContactNumber" 
                        label="Contact Number"
                        onChange={this.setNumber} 
                        variant="outlined" />
                    </Grid>
                    <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                    <TextField
                        placeholder="Home Address"
                        fullWidth
                        id="staffAddress" 
                        label="Address"
                        onChange={this.setAddress} 
                        variant="outlined" />
                    </Grid>
                    <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                        <Button 
                        variant="outlined" 
                        style ={{color:'#424242'}}
                        onClick={this.postStaff}
                        fullWidth>
                        Add Staff Member</Button>
                        </Grid>
                </Grid>
                </Container>
            </div>)
    }
}