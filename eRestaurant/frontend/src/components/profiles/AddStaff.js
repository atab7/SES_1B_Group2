
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
import Container from '@material-ui/core/Container';

export default class AddStaff extends React.Component {
    constructor(props){
      super();
    }
    render(){
        return(
            <div>
                <Container maxWidth="sm">
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{height:80}}>
                     <b><p  style={{textAlign: 'center', fontSize:'24px'}}>Create A Staff Account</p></b>
                    </Grid>
                    <Grid item xs={12} sm={6}  style={{paddingLeft: '24px'}}>
                    <TextField
                        placeholder="Hugh"
                        fullWidth
                        id="staffFN" 
                        label="First Name" 
                        style = {{width: 252}}
                        variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        placeholder="Jass"
                        fullWidth
                        id="staffLN" 
                        style = {{width: 252}}
                        label="Last Name"
                        variant="outlined" />
                    </Grid>
                    <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                    <TextField
                        placeholder="Hugh.Jass@email.com"
                        fullWidth
                        id="staffEmail" 
                        label="Email Address" 
                        variant="outlined" />
                    </Grid>
                    <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                    <TextField
                        fullWidth
                        id="staffPassword"
                        label="Password" 
                        type="password"
                        variant="outlined" />
                    </Grid>
                    <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                    <TextField
                        placeholder="Head Chef, Waiter, or Manager"
                        fullWidth
                        id="staffRole" 
                        label="Role" 
                        variant="outlined" />
                    </Grid>
                    <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                    <TextField
                        placeholder="0412345678"
                        fullWidth
                        id="staffContactNumber" 
                        label="Contact Number" 
                        variant="outlined" />
                    </Grid>
                    <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                    <TextField
                        placeholder="1 Hugh Jass Street, Sydney, NSW 2000"
                        fullWidth
                        id="staffAddress" 
                        label="Address" 
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
                </Container>
            </div>)
    }
}