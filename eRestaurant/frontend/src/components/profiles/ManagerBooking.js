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

export default class ManagerBooking extends React.Component {
    constructor(props){
      super();
    }
    render(){
        return(
            <div>
                <Paper>
                <b><p   style={{textAlign: 'center', fontSize:'24px', paddingTop:'12px'}}>Current Bookings</p></b>
                <TableContainer >
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Booking ID</TableCell>
                            <TableCell align="center">Branch</TableCell>
                            <TableCell align="center">Number of People</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Time</TableCell>
                            <TableCell align="center">Total Cost</TableCell>
                            <TableCell align="center">Menu Items</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                        <TableCell>1000</TableCell>
                            <TableCell align="center">Main</TableCell>
                            <TableCell align="center">5</TableCell>
                            <TableCell align="center">25 September 2020</TableCell>
                            <TableCell align="center">5:00pm</TableCell>
                            <TableCell align="center">$200</TableCell>
                            <TableCell align="center">
                                <Button 
                                variant="outlined" 
                                style ={{color:'#424242'}}
                                fullWidth>
                                View</Button></TableCell>
                        </TableRow>
                        </TableBody>
                        <TableBody>
                        <TableRow>
                        <TableCell>1002</TableCell>
                            <TableCell align="center">Main</TableCell>
                            <TableCell align="center">2</TableCell>
                            <TableCell align="center">28 October 2020</TableCell>
                            <TableCell align="center">6:00pm</TableCell>
                            <TableCell align="center">$60</TableCell>
                            <TableCell align="center">
                                <Button 
                                variant="outlined" 
                                style ={{color:'#424242'}}
                                fullWidth>
                                View</Button></TableCell>
                        </TableRow>
                        </TableBody>
                        <TableBody>
                        <TableRow>
                        <TableCell>1003</TableCell>
                            <TableCell align="center">Main</TableCell>
                            <TableCell align="center">3</TableCell>
                            <TableCell align="center">21 September 2020</TableCell>
                            <TableCell align="center">8:00pm</TableCell>
                            <TableCell align="center">$100</TableCell>
                            <TableCell align="center">
                            <Button 
                                variant="outlined" 
                                style ={{color:'#424242'}}
                                fullWidth>
                                View</Button>
                            </TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
                    </Paper>
            </div>)
    }
}