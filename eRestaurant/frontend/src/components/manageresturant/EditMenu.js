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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default class EditMenu extends React.Component {
    constructor(props){
        super();

        this.state= {
        }
    }

    render(){
        return (
        <div>
            <Container maxWidth="lg">
                <Paper>
                <b><p   style={{textAlign: 'center', fontSize:'24px', paddingTop:'12px'}}>Active Menus</p></b>
                <Select
                style={{width:'265px'}}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                //value={}
                //onChange={}
                label="Select Menu"
                fullWidth
                >
                <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
                <MenuItem value={"Lunch"}>Lunch</MenuItem>
                <MenuItem value={"Dinner"}>Dinner</MenuItem>
                </Select>
                <TableContainer >
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">Menu Item Name</TableCell>
                            <TableCell align="center">Menu Price</TableCell>
                            <TableCell align="center">Menu Description</TableCell>
                            <TableCell align="center">Menu Item</TableCell>
                        </TableRow>
                        </TableHead>

                        <TableBody>
                        <TableRow>
                            <TableCell align="center">Burger</TableCell>
                            <TableCell align="center">description</TableCell>
                            <TableCell align="center">100</TableCell>
                            <TableCell align="center">
                                <Button 
                                variant="outlined" 
                                style ={{color:'#424242'}}
                                fullWidth
                                >
                                Delete</Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button 
                                variant="outlined" 
                                style ={{color:'#424242'}}
                                fullWidth>
                                Confirm</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">
                                <TextField 
                                id="MealName" 
                                label="Menu Item Name" 
                                variant="outlined" 
                                fullWidth
                                 />
                            </TableCell>
                            <TableCell align="center">
                            <TextField 
                                id="MealPrice" 
                                label="Menu Item Price" 
                                variant="outlined" 
                                fullWidth
                                 />
                            </TableCell>
                            <TableCell align="center">
                                <TextField 
                                id="MealDescription" 
                                label="Menu Item Description" 
                                variant="outlined" 
                                fullWidth
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Button 
                                variant="outlined" 
                                style ={{color:'#424242'}}
                                fullWidth
                                >
                                Add</Button>
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