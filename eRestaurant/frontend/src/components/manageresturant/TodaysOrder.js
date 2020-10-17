import React from 'react';
import { Container, TableContainer } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class TodaysOrder extends React.Component {
    constructor(props){
      super();
      this.state = {
          viewMenu:false,
      }
      this.closeViewMenu = this.closeViewMenu.bind(this);
      this.openViewMenu = this.openViewMenu.bind(this);
    }
    closeViewMenu(){
        this.setState({
          viewMenu:false
        })
      }
    openViewMenu(){
        this.setState({
          viewMenu:true
        })
    }
    render(){
        return(
        <Container>
        <TableContainer>
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
            <TableBody>
                <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell align="center">5</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">2</TableCell>
                    <TableCell align="center"><Button 
                    variant="outlined" 
                    style ={{color:'#424242'}}
                    fullWidth
                    onClick={this.openViewMenu}>
                    View</Button></TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </TableContainer>
        <Dialog open={this.state.viewMenu} onClose={this.closeViewMenu} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" style={{textAlign: 'center'}}>Selected Items</DialogTitle>
                    <TableContainer >
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">Menu Item</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Price</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableCell align="center">Donut</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">1</TableCell>
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <DialogActions>
                        <Button onClick={this.closeViewMenu} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
        </Container>
        )   
    }       
}