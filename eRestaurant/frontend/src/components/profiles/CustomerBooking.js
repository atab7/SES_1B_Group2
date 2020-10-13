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
import { Container } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class CustomerBooking extends React.Component {
    constructor(props){
        super();

        this.state= {
            menuItems:false,
        }
    
        this.setMenuOpen = this.setMenuOpen.bind(this);
        this.setMenuClose = this.setMenuClose.bind(this);
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

    render(){
        return (
        <div>
            <Container maxWidth="lg">
                <Paper>
                <b><p   style={{textAlign: 'center', fontSize:'24px', paddingTop:'12px'}}>Current Bookings</p></b>
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

                        <TableBody>
                        <TableRow>
                            <TableCell align="center">2</TableCell>
                            <TableCell align="center">12 October 2020</TableCell>
                            <TableCell align="center">6 PM</TableCell>
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
                                <Button 
                                variant="outlined" 
                                style ={{color:'#424242'}}
                                fullWidth>
                                Confirm</Button>
                            </TableCell>
                        </TableRow>
                        </TableBody>
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