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
import { Container } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import {axios_config} from '../../config.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'js-cookie';


export default class CustomerBooking extends React.Component {
    constructor(props){
        super();

        
        this.setDate = this.setDate.bind(this);
        this.getBookings = this.getBookings.bind(this);
        this.toReadableDateString = this.toReadableDateString.bind(this);
        this.setMenuOpen = this.setMenuOpen.bind(this);
        this.setMenuClose = this.setMenuClose.bind(this);
        this.getBookings = this.getBookings.bind(this);
        this.updateState = this.updateState.bind(this);
        this.state= {
            menuItems:false,
            bookings: [],
            date: new Date()
        }
    }
    setMenuOpen(evt){
        this.setState({
        menuItems: true
        })
    }
    setMenuClose(evt){
        this.setState({
        menuItems: false
        })
    }

    getBookings(){
        var token = localStorage.getItem('auth_token');
        axios.get(`${axios_config["baseURL"]}api/customer-bookings/?date=${this.dateToString(this.state.date)}`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then((response) => {
            if(response.data.length){
                this.setState({
                    bookings: response.data
                });
            }else{
                this.setState({
                    bookings: []
                });
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    dateToString(date){
        var ISOdate = date.toISOString();
        return ISOdate.substring(0, ISOdate.indexOf("T"));
    }

    toReadableDateString(dateString){
        var date = new Date(dateString);
        return date.toDateString();

    }

    setDate(evt){
        this.setState({
            date: evt
        });
    }

    componentDidMount(){
        this.getBookings();
    }

    updateState(){
        this.getBookings();
    }

    setBookingsJSX(booking){
        return( 
        <TableBody>
            <TableRow>
                <TableCell align="center">{booking.number_of_people}</TableCell>
                <TableCell align="center">{this.toReadableDateString(booking.date)}</TableCell>
                <TableCell align="center">{booking.time.substring(0, booking.time.length -3)}</TableCell>
                <TableCell align="center">
                    <Button 
                    variant="outlined" 
                    style ={{color:'#424242'}}
                    fullWidth
                    onClick={this.setMenuOpen}
                    >
                    View</Button>
                </TableCell>
                <TableCell align="center">
                    <CancelBooking booking_id={booking.ID} updateParentState={this.updateState}/>
                </TableCell>
            </TableRow>
            </TableBody>);
    }



    render(){
        return (
        <div>
            <Container maxWidth="lg">
                <Paper>
                <b><p   style={{textAlign: 'center', fontSize:'24px', paddingTop:'12px'}}>Current Bookings</p></b>
                <DatePicker selected={this.state.date} onSelect={date => this.setDate(date)} />
                <Button variant="outlined" style ={{color:'#424242'}} onClick={this.getBookings} fullWidth>Get Bookings</Button>
                <TableContainer >
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">People</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Time</TableCell>
                            <TableCell align="center">Selected Menu Items</TableCell>
                            <TableCell align="center">Cancel Booking</TableCell>
                        </TableRow>
                        </TableHead>

                        {(this.state.bookings.length) ? this.state.bookings.map(this.setBookingsJSX, this) : <p>No Bookings Found for Selected Date</p>}
                       
                    </Table>
                </TableContainer>
                </Paper>
                </Container>    
                <Dialog open={this.state.menuItems} onClose={this.setMenuClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" style={{textAlign: 'center'}}>Le Bistrot D'Andre<br/>Selected Menu Items</DialogTitle>
                    <TableContainer >
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">Menu Item(s)</TableCell>
                            <TableCell align="center">Cost</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                            <TableCell align="center">Cake</TableCell>
                            <TableCell align="center">$12</TableCell>
                            <TableCell align="center">1</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <DialogActions>
                        <Button onClick={this.setMenuClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )}
    
}

class CancelBooking extends React.Component {

    constructor(props){
        super();
        this.cancelBooking = this.cancelBooking.bind(this);
    }

    cancelBooking(){
        const csrftoken = Cookies.get('csrftoken');
        axios.patch(`${axios_config["baseURL"]}api/customer-bookings/${this.props.booking_id}/cancel-booking/`, 
        {},
        {
            headers:{ 
                'Authorization': `Token ${localStorage.getItem('auth_token')}`,
                'X-CSRFToken': csrftoken
            }
        })
        .then((response) => {
            this.props.updateParentState();
            //console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render(){
        return(
        <Button 
        variant="outlined" 
        style ={{color:'#424242'}}
        fullWidth
        onClick={this.cancelBooking}
        >
        Cancel</Button>);
    }
}