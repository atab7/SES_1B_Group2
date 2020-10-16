import React from 'react';
import NavBar from './NavBar';
import HomepageTabs from './HomepageTabs';
import CustomerNavBar from './CustomerNavBar';
import { Box } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import { withStyles} from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Header from './images/frenchpic.jpeg';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Background from './images/defaultBackground.jpg';
import Menu from './Menu';
import ManagerNavBar from './ManagerNavBar.js';
//import EditAccount from './EditAccount';
import axios from 'axios';
import {axios_config} from '../config.js';
import { set } from 'js-cookie';
import MakeBooking from './MakeBooking';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    flexBut: {
        flexGrow: 1,
      },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
      },
  }));

var headerImg = {
  width: "100%",
  height: "350px",
  backgroundImage: `url(${Header})`,
};

var backgroundImg = {
  width: "100%",
  height: "750px",
  backgroundImage: `url(${Background})`
};
  




/*value of booking slider shows above*/
function valuetext(value) {
  return `${value}`;
}

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

/* These are just default branches link to database later  */
const branches_url = 'http://127.0.0.1:8000/api/restaurants/';
var branches = []; 
axios.get(branches_url)
  .then((response) => { branches = response.data } )
  .then(err=>console.log(err));

  const numOfPeople = [
  {
    value: '0',
    label: '0',
  },
  {
    value: '5',
    label: '5',
  },
  {
    value: '10',
    label: '10',
  },

];
   
const postBooking = (branch) => {
    const branch_id = Object.keys(branches).find(key => branches[key] === branch);
    console.log(branch_id);
    //axios.post('http://127.0.0.1:8000/api/bookings/', {
    //  "ID": b
    //})
};



export default class HomePage extends React.Component { 
  
  constructor(props){
    super();
  
    this.state = {
      branch:'',
      booking:false,
      emailConfirmed:true,
    }

    //Binds
    this.setBranch = this.setBranch.bind(this);
    this.setBookingOpen = this.setBookingOpen.bind(this);
    this.setBookingClose = this.setBookingClose.bind(this);
  }
  setBranch(evt) {
    this.setState({
      branch: evt.target.value
    })
  }
  setBookingOpen(){
    this.setState({
      booking: true
    })
  }
  setBookingClose(){
    this.setState({
      booking: false
    })
  }
  setEmailConfirmed(){
    this.setState({
      emailConfirmed:true
    }
  )
  }

  isConfirmed(){
    axios.get(`${axios_config["baseURL"]}api/customer/` , {
      headers:{
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
      }
  })
    .then((response) => {
      if(response.data.length){
        var is_confirmed = response.data[0].is_confirmed
        this.setState({
          emailConfirmed: is_confirmed
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  isAuth = (token) => { 
    return localStorage.getItem('auth_token') !== null;
  }

  isManager = () => {
    return localStorage.getItem('user_type') === 'manager';
  }
  
  setNavBar = () => {
    
    if(this.isAuth()){
      if(this.isManager()){
        //console.log("manager");
        return <ManagerNavBar/>;
      }
      else{
        //console.log("cust");
        return <CustomerNavBar/>;
      }
    }else{
      //console.log("reg");
      return <NavBar/>;
    }
  }

  componentDidMount(){
    const user_type = localStorage.getItem('user_type');
    if(user_type === 'customer'){
      this.isConfirmed();
    }
  }

  render()
  {
      
      return(
          <div>
              {this.setNavBar()}
              <Box style={ headerImg }>
              </Box>
              <Box style={ backgroundImg }>
              <Container maxWidth="lg">
                  <Box display="flex" p={1}>
                      <Box p={1}>
                      <FormControl>
                          <InputLabel id="demo-simple-select-autowidth-label">Branch</InputLabel>
                          <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={this.state.branch}
                          onChange = {e => this.setBranch(e)}
                          autoWidth
                          >
                          <MenuItem value={10}>Branch</MenuItem>
                          <MenuItem value={20}>Branch 2</MenuItem>
                          <MenuItem value={30}>Branch 3</MenuItem>
                          </Select>
                          <FormHelperText>Select Branch</FormHelperText>
                      </FormControl>
                      </Box> 
                      <HomepageTabs/>

                      <Box p={1}>
                      <RegButton size="large" onClick={this.setBookingOpen}>Book Now</RegButton>
                      <Dialog open={this.state.booking} onClose={this.setBookingClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title" style={{textAlign: 'center'}}>Le Bistrot D'Andre<br/>I'd Like To Book</DialogTitle>
                        <MakeBooking updateParentState={this.setBookingClose}/>
                        <DialogActions>
                          <Button onClick={this.setBookingClose} color="primary">
                            Cancel
                          </Button>
                            
                        </DialogActions>

                      </Dialog> 
                      </Box>

                      
                  </Box>
                  <Snackbar open={!(this.state.emailConfirmed)} autoHideDuration={3000} >
                    <Alert severity="error"> 
                      Please Confirm Your Email Before Making A Booking. Please check your inbox for a confirmation mail.
                    </Alert>
                </Snackbar>
              </Container>
              </Box>
          </div>
      )
  }
}