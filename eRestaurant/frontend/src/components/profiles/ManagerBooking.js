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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from 'axios';
import {axios_config} from '../../config.js';



export default class ManagerBooking extends React.Component {
    constructor(props){
      super();
      
      this.setDate = this.setDate.bind(this);
      this.getBookings = this.getBookings.bind(this);
      this.toReadableDateString = this.toReadableDateString.bind(this);

      const date = new Date();
      const today = new Date(date.toLocaleDateString("en-US", {timeZone: "Australia/Sydney"}));
      this.state = {
          bookings: [],
          date: today
      };
    }

    getBookings(){
        var token = localStorage.getItem('auth_token');
        axios.get(`${axios_config["baseURL"]}api/bookings/?date=${this.dateToString(this.state.date)}`, {
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

    setBookingsJSX(booking){
        return(
        <TableBody>
            <TableRow>
            <TableCell>{booking.ID}</TableCell>
                <TableCell align="center">{booking.number_of_people}</TableCell>
                <TableCell align="center">{this.toReadableDateString(booking.date)}</TableCell>
                <TableCell align="center">{booking.time.substring(0, booking.time.length -3)}</TableCell>
                <TableCell align="center">${booking.cost}</TableCell>
                <TableCell align="center">
                    <Button 
                    variant="outlined" 
                    style ={{color:'#424242'}}
                    fullWidth>
                    View</Button></TableCell>
            </TableRow>
            </TableBody>);

    }

    setDate(evt){
        this.setState({
            date: evt
        });
    }

    componentDidMount(){
        this.getBookings();
    }

    render(){
        return(
            <div>
                <Paper>
                <b><p   style={{textAlign: 'center', fontSize:'24px', paddingTop:'12px'}}>Current Bookings</p></b>
                <DatePicker selected={this.state.date} onSelect={date => this.setDate(date)} />
                <Button variant="outlined" style ={{color:'#424242'}} onClick={this.getBookings} fullWidth>Get Bookings</Button>
                <TableContainer >
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Booking ID</TableCell>
                            <TableCell align="center">Number of People</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Time</TableCell>
                            <TableCell align="center">Total Cost</TableCell>
                            <TableCell align="center">Menu Items</TableCell>
                        </TableRow>
                        </TableHead>

                        {(this.state.bookings.length) ? this.state.bookings.map(this.setBookingsJSX, this) : <p>No Bookings Found for Selected Date</p>}
                        
                    </Table>
                    </TableContainer>
                </Paper>
            
            </div>)
    }
}

