
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


export default class Rewards extends React.Component {
    constructor(props){
      super();

      this.state = {
          rewards: []
      }
    }

    getRewards(){

    }

    render(){
        return(
            <div>
                <Paper>
                <b><p   style={{textAlign: 'center', fontSize:'24px', paddingTop:'12px'}}>On Going Rewards</p></b>
                <TableContainer >
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Reward ID</TableCell>
                            <TableCell align="center">Promocode</TableCell>
                            <TableCell align="center">Discount Percentage (%)</TableCell>
                            <TableCell align="center">Delete Promocode
                            </TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                            <TableCell>100000</TableCell>
                            <TableCell align="center">SAVE5</TableCell>
                            <TableCell align="center">5</TableCell>
                            <TableCell align="center">
                            <Button 
                                variant="outlined" 
                                style ={{color:'#424242'}}
                                fullWidth>
                                Remove</Button>
                            </TableCell>
                        </TableRow>
                        </TableBody>
                        <TableBody>
                        <TableRow>
                            <TableCell>100001</TableCell>
                            <TableCell align="center">SAVE10</TableCell>
                            <TableCell align="center">10</TableCell>
                            <TableCell align="center">
                            <Button 
                                variant="outlined" 
                                style ={{color:'#424242'}}
                                fullWidth>
                                Remove</Button>
                            </TableCell>
                        </TableRow>
                        </TableBody>
                        <TableBody>
                        <TableRow>
                            <TableCell>100002</TableCell>
                            <TableCell align="center">SAVE20</TableCell>
                            <TableCell align="center">20</TableCell>
                            <TableCell align="center">
                            <Button 
                                variant="outlined" 
                                style ={{color:'#424242'}}
                                fullWidth>
                                Remove</Button>
                            </TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
                    </Paper>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{height:80}}>
                     <b><p  style={{textAlign: 'center', fontSize:'24px'}}>Add Rewards</p></b>
                    </Grid>
                    <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                    <TextField
                        placeholder="SAVE20"
                        fullWidth
                        id="rewardCode" 
                        label="Enter PromoCode" 
                        variant="outlined" />
                    </Grid>
                    <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                    <TextField
                        placeholder="20"
                        fullWidth
                        id="rewardCode" 
                        label="Enter Discount Percentage" 
                        variant="outlined" />
                    </Grid>
                    <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                        <Button 
                        variant="outlined" 
                        style ={{color:'#424242'}}
                        fullWidth>
                        Add Promocode</Button>
                        </Grid>


                </Grid>
                
            </div>
        )
    }
}  