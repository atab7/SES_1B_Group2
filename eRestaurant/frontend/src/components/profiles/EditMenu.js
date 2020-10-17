import React from 'react';
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
import TextField from '@material-ui/core/TextField';
import {Box} from '@material-ui/core';

export default class EditMenu extends React.Component {
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

    getMenus(){

    }

    render(){
        return (
        <div>
            <Container maxWidth="lg">
                <Paper>
                <b><p   style={{textAlign: 'center', fontSize:'24px', paddingTop:'12px'}}>Active Menus</p></b>
                <TableContainer >
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">Menu ID</TableCell>
                            <TableCell align="center">Menu Name</TableCell>
                            <TableCell align="center">Menu Items</TableCell>
                            <TableCell align="center">Delete Menu</TableCell>
                        </TableRow>
                        </TableHead>

                        <TableBody>
                        <TableRow>
                            <TableCell align="center">1</TableCell>
                            <TableCell align="center">Breakfast</TableCell>
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
                            <TableCell align="center">Remove Item</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                            <TableCell align="center">Cake</TableCell>
                            <TableCell align="center">$12</TableCell>
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
                    <p>Add A Menu Item</p>
                    <Box>
                        <TextField
                        id="outlined-full-width"
                        label="Menu Name"
                        placeholder="Cake"
                        margin="normal"
                        variant="outlined"
                        />
                        <TextField
                        id="outlined-full-width"
                        label="Cost"
                        placeholder="12"
                        margin="normal"
                        variant="outlined"
                        />
                        <Button variant="contained"
                        margin="normal"
                        >Confirm</Button>
                    </Box>
                    <DialogActions>
                        <Button onClick={this.setMenuClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )}
    
}

