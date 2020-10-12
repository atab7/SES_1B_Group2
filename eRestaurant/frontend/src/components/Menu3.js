import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { TextField, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


    


const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

function createData(item, ingredients, price, quantity) {
  return { item, ingredients, price, quantity};
}

  
const numOfPeople = [
    {
      value: '0',
      label: '0',
    },
    {
      value: '5',
      label: '5',
    },
    {
      value: '10',
      label: '10',
    },
  
  ];

const branches = [
    {
      value: 'branch1',
      label: 'location1',
    },
    {
      value: 'branch2',
      label: 'location2',
    },
    {
      value: 'branch3',
      label: 'location3',
    },
  
  ];


const rows = [
  createData('French Toast', 'bro its toast',  159, 0),
  createData('Ice cream sandwich', 'imagine a sandwhich with icecream', 237, 0),
  createData('Eclair', 'idek what this is', 262, 0),
  createData('Cupcake', 'smol cak', 305, 0),
  createData('Gingerbread', 'dude from shrek', 356, 0),
];

export default function BasicTable() {
    /*Branch select on booking form */
  const [bookingBranch, setBookingBranch] = React.useState('branch1');
  const handleChangeBB = (event) => {
    setBookingBranch(event.target.value);
  };
  /*Number of people select slider on branch*/
  const [numpeople, setNumPeople] = React.useState(30);
  const handleChangePeople = (event, newValue) => {
    setNumPeople(newValue);
  };
  const [open, setOpenBooking] = React.useState(true);
  const handleOpenBooking = () => {
    setOpenBooking(true);
  };
  const handleCloseBooking = () => {
    setOpenBooking(false);
  };
  /* Booking */
  const [open2, setOpenMenu] = React.useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(true);
  };
  const handleCloseMenu = () => {
    setOpenMenu(false);
  };
  const classes = useStyles();
  const [quantity, setQuanity] = React.useState('');
  const handleChange = (event) => {
    setQuanity(event.target.value);
    rows.quantity=event.target.value;
  };

  return (
      <div>
          <Dialog open={open} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title" style={{textAlign: 'center'}}>Le Bistrot D'Andre<br/>I'd Like To Book</DialogTitle>
                      <DialogContent>
                       <form>
                       <Grid container spacing={3}>
                          <Grid item xs={12}>
                          <TextField
                            id="outlined-select-branch"
                            select
                            label="Select"
                            value={branches}
                            onChange={handleChangeBB}
                            fullWidth 
                            helperText="Please select your branch"
                            variant="outlined"
                          >
                            {branches.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                          </Grid>
                          <Grid item xs={12}>
                            <Slider 
                            min={0}
                            max={10}
                            step={1}
                            value={numpeople} 
                            onChange={handleChangePeople} 
                            aria-labelledby="continuous-slider"
                            marks={numOfPeople}
                            valueLabelDisplay="auto"
                             />
                          </Grid>
                          <Grid item xs={6}>
                            <Button variant="contained" color="primary">
                              Today
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                          <TextField
                              id="date"
                              label="Booking Date"
                              type="date"
                              defaultValue="values.someDate"
                              className={classes.textField}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </Grid>
                        </Grid>
                       </form>
                      </DialogContent>

                      <DialogActions>
                        <Button onClick={handleCloseBooking} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={handleCloseBooking, handleOpenMenu} color="primary">
                          Proceed to Menu
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Dialog open={open2} onClose={handleCloseMenu} aria-labelledby="form-dialog-title" maxWidth>
                      <DialogTitle id="form-dialog-title" style={{textAlign: 'center'}}>Le Bistrot D'Andre<br/>Add Menu Items</DialogTitle>
                      <DialogContent>
                       <form>
                       <Grid container spacing={3}>
                          <Grid item xs={12}>
                          <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                <TableCell align="left"> </TableCell>
                                    <TableCell>Menu Item</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Quantity</TableCell>

                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name}>
                                    <TableCell align="left"> <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></TableCell>
                                    <TableCell component="th" scope="row">
                                        <React.Fragment>
                                        <Typography>
                                            {row.item}
                                        </Typography>
                                            {row.subitem}
                                        </React.Fragment>
                                    </TableCell>
                                    <TableCell align="right">{row.price}</TableCell>
                                    <TableCell align="right">
                                    <FormControl className={classes.margin}>
                                        <Select
                                        labelId="demo-customized-select-label"
                                        id="demo-customized-select"
                                        value={rows.quantity}
                                        onChange={handleChange}
                                        input={<BootstrapInput />}
                                        >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        </Select>
                                    </FormControl>
                                    </TableCell>

                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                          
                          </Grid>
                        </Grid>
                       </form>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseMenu} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={handleCloseBooking, handleOpenMenu} color="primary">
                          Add Items
                        </Button>
                      </DialogActions>

        </Dialog>
    </div>
  );
}
