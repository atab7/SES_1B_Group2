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
import StaffNavBar from './StaffNavBar.js';
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
      bookingAvailable:false,
      emailConfirmed2:false,
    }

    //Binds
    this.setBranch = this.setBranch.bind(this);
    this.setBookingOpen = this.setBookingOpen.bind(this);
    this.setBookingClose = this.setBookingClose.bind(this);
    this.closeBookingAvailable = this.closeBookingAvailable.bind(this);
    this.closeEmailConfirmed = this.closeEmailConfirmed.bind(this);
    this.setBookNowButton = this.setBookNowButton.bind(this);
    this.confirmedCheck = this.confirmedCheck.bind(this);
    this.isAuth = this.isAuth.bind(this);
  }
  closeBookingAvailable() {
    this.setState({
      bookingAvailable: false
    })
  }
  closeEmailConfirmed() {
    this.setState({
      emailConfirmed: true
    })
  }
  setBranch(evt) {
    this.setState({
      branch: evt.target.value
    })
  }
  setBookingOpen(){
    console.log(this.isAuth());
    console.log(this.state.emailConfirmed);
    if (this.isAuth()==true && this.state.emailConfirmed==true)
    {
      this.setState({
        booking: true
      });
    }
    else {
      {
        this.setState({
          bookingAvailable:true
        });
      }
  }
  }
  setBookingClose(){
    this.setState({
      booking: false
    })
  }

  isConfirmed(){
    axios.get(`${axios_config["baseURL"]}api/customer/` , {
      headers:{
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
      }
  })
    .then((response) => {
      if(response.data.length){
        var is_confirmed = response.data[0].is_confirmed;
        localStorage.setItem('is_confirmed', is_confirmed);
        this.setState({
          emailConfirmed: is_confirmed,
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
      var user_type = localStorage.getItem('user_type');
      if(user_type === 'manager' || user_type === 'staff' ){
        //console.log("manager");
        return <ManagerNavBar/>;
      }else{
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

  setBookNowButton(){
    if(this.isAuth() && localStorage.getItem('is_confirmed') === false){
      return (<RegButton size="large">Book Now</RegButton>);
    }else{
      return (<RegButton size="large" onClick={this.setBookingOpen} >Book Now</RegButton>);
    }
  }

  confirmedCheck(){
    if(this.isAuth() && localStorage.getItem('is_confirmed') === false){
      return true;
    }else{
      return false;
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
                      </Box> 
                      <HomepageTabs/>

                      <Box p={1}>
                      {this.setBookNowButton()}
                      <Dialog open={this.state.booking} onClose={this.setBookingClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title" style={{textAlign: 'center'}}>Le Bistrot D'Andre<br/>I'd Like To Book</DialogTitle>
                        <MakeBooking updateParentState={this.setBookingClose}/>
                        <DialogActions>
                          <Button onClick={this.setBookingClose}  color="primary">
                            Cancel
                          </Button>
                            
                        </DialogActions>

                      </Dialog> 
                      </Box>

                      
                  </Box>
                  <Snackbar open={this.confirmedCheck()} autoHideDuration={10000} onClose={this.closeEmailConfirmed}>
                    <Alert severity="error" > 
                      Please confirm your email before making a booking. Please check your inbox for a confirmation mail.
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.bookingAvailable} autoHideDuration={10000} onClose={this.closeBookingAvailable}>
                    <Alert severity="error" onClose={this.closeBookingAvailable}> 
                      {this.isAuth() ? 'Please confirm your email before making a booking. Please check your inbox for a confirmation mail.' :'Please login to make a booking.'}
                    </Alert>
                </Snackbar>
              </Container>
              </Box>
          </div>
      )
  }
}