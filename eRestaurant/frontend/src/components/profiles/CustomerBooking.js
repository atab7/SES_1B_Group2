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
        
        const date = new Date();
        const today = new Date(date.toLocaleDateString("en-US", {timeZone: "Australia/Sydney"}));
        this.state= {
            menuItems:false,
            bookings: [],
            date: today,
            booking_viewed: {}
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
        return date.toLocaleDateString('fr-CA');
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
                <TableCell align="center">{booking.restaurant_name}</TableCell>
                <TableCell align="center">
                    <Button 
                    variant="outlined" 
                    style ={{color:'#424242'}}
                    fullWidth
                    onClick={this.setMenuOpen}
                    >
                    View Invoice
                    </Button>
                    
                    <BookingDetails booking={booking} setMenuClose={this.setMenuClose} menuItems={this.state.menuItems}/>
                </TableCell>
                <TableCell align="center">
                    <CancelBooking date={this.state.date} booking_id={booking.ID} updateParentState={this.updateState}/>
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
                            <TableCell align="center">Restaurant</TableCell>
                            <TableCell align="center">Invoice</TableCell>
                            <TableCell align="center">Cancel Booking</TableCell>
                        </TableRow>
                        </TableHead>

                        {(this.state.bookings.length) ? this.state.bookings.map(this.setBookingsJSX, this) : <p>No Bookings Found for Selected Date</p>}
                       
                    </Table>
                </TableContainer>
                </Paper>
                </Container>    
                
            </div>
        )}
    
}

class CancelBooking extends React.Component {

    constructor(props){
        super();
        this.cancelBooking = this.cancelBooking.bind(this);

        this.state = {
            prev_date: new Date(props.date.getTime() - (1000 * 60 * 60 * 24))
        };
    }

    componentDidUpdate(prevProps){
        if(this.props.date !== prevProps.date){
            this.setState({
                prev_date: new Date(this.props.date.getTime() - (1000 * 60 * 60 * 24))
            });
        }
    }

    cancelBooking(){
        
        const date = new Date();
        const today = new Date(date.toLocaleDateString("en-US", {timeZone: "Australia/Sydney"}));
        if(this.state.prev_date.valueOf() <= today.valueOf()){
            alert("There is 1 day or less to this booking. Our company policy prevents us from cancelling it. Sorry.");
            return 0;
        }

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

class BookingDetails extends React.Component {
    constructor(props){
        super();

        this.state = {
            orders: []
        }
    }

    setDetailsJSX(){
       var JSXs = [];
       var order;
       for(order of this.state.orders){
       JSXs.push(
        <TableRow>
            <TableCell align="center">{order.name}</TableCell>
            <TableCell align="center">{order.description}</TableCell>
            <TableCell align="center">${order.price}</TableCell>
        </TableRow>
       );
       }
       return JSXs;
    }

    getOrders(){
        axios.get(`${axios_config["baseURL"]}api/orders/?booking=${this.props.booking.ID}`, 
        {
            headers: { 'Authorization': `Token ${localStorage.getItem('auth_token')}`}
        })
        .then((response) => {
            console.log(response.data)
            this.setState({
                orders: response.data
            })
        });
    }

    componentDidMount(){
        this.getOrders();
    }

    componentDidUpdate(prevProps){
        if(this.props.booking !== prevProps.booking){
            this.getOrders();
        }
    }
    
    render(){
        return(
            <Dialog open={this.props.menuItems} onClose={this.props.setMenuClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" style={{textAlign: 'center'}}>Le Bistrot D'Andre<br/>Invoice For Booking</DialogTitle>
                    <TableContainer >
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">Order</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Price</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.setDetailsJSX()}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <h3>Total Price: {this.props.booking.price} </h3>
                    <h3>Reward Applied: {this.props.booking.reward} </h3>
                    <DialogActions>
                        <Button onClick={() => window.print()}>PRINT</Button>
                        <Button onClick={this.props.setMenuClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
        );
    }
}