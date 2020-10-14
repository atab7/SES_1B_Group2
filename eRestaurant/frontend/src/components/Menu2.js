import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles, lighten } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import { TextField, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';


    


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

//This const is for selecting the restaurant location
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

//This const is for selecting the restaurant location
const branchesMenu = [
  {
    value: 'menu1',
    label: 'Breakfast',
  },
  {
    value: 'menu2',
    label: 'Lunch',
  },
  {
    value: 'menu3',
    label: 'Dinner',
  },

];

const branchesTime = [
  {
    value: 'time1',
    label: '10:00am',
  },
  {
    value: 'time2',
    label: '11:00am',
  },
  {
    value: 'time3',
    label: '12:00pm',
  },
]
  

  /* Menu */

  function createData(name, ingredients, price, quantity) {
    return { name, ingredients, price, quantity};
  }
  
  const rows = [
    createData('Cupcake', 'cake but cup size', 5.0, 1),
    createData('Donut', 'heart attack food', 10.0, 1),
    createData('Eclair', 'idek what this is', 16.0, 1),
    createData('Frozen yoghurt', 'frozen yoga hurt', 6.0, 1),
    createData('Gingerbread', 'better than inbred', 16.0, 1),
    createData('Honeycomb', 'not for your hair', 3.2, 1),
    createData('Ice cream sandwich', 'brain freeze sandwich', 9.0, 1),
    createData('Jelly Bean', 'expensive ass jelly bean', 1000.0, 1),
    createData('KitKat', 'fresh from woolworths', 26.0, 1),
    createData('Lollipop', 'they suck tho', 5, 1),
    createData('Marshmallow', 'also very expensive', 2000, 1),
    createData('Nougat', 'nougat to give us a HD Tej', 19.0, 1),
    createData('Oreo', 'thats racist', 18.0, 1),
  ];


  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Menu Items' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Price ($)' },
    { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' }
  ];
  
  function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            {/* <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            /> */}
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }));
  
  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Dessert
          </Typography>
        )}
  
        
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    table: {
      minWidth: 650,
    }
  }));

export default function BasicTable() {
  /*Const for enabling and disbaling menu selector*/
  const [menuDisable, setMenuDisable] = React.useState(true);
  /*Branch select on booking form */
  const [bookingBranch, setBookingBranch] = React.useState('');
  const handleChangeBB = (event) => {
    setBookingBranch(event.target.value);
    setMenuDisable(false);
  };
  /* Menu select on booking form (breakfast, lunch, dinner) */
  const [menuBranch, setMenuBranch] = React.useState('branch1');
  const handleChangeMenu = (event) => {
    setMenuBranch(event.target.value);
  };
  /* Time select on booking form */
  const [timeBranch, setTimeBranch] = React.useState('time0');
  const handleChangeTime = (event) => {
    setTimeBranch(event.target.value);
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
  
  const handleChange = (event, number) => {
    rows[number].quantity = event.target.value;
  };

  const [isChecked, setIsChecked] = React.useState(false);

  //Event handler for branches
 
  console.log(bookingBranch);
  /* ------------------------------------For Menu----------------------------- */
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  /* This const stores the values of all the selected menu 
  items in the form of name, ingredients, price, quantity */
  const [menuSelected, setMenuSelected] = React.useState([]);

  //This event handler will sort the columns into ascending and descending order
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = rows.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  //This event handler will add selected items into an array
  const handleClick = (event, name, ingredients, price, quantity) => {
    const selectedIndex = selected.indexOf(name);
    const selectedRows = [createData(name, ingredients, price*quantity, quantity)];

    let newSelected = [];
    let newMenuSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      newMenuSelected = newMenuSelected.concat(menuSelected, selectedRows);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newMenuSelected = newMenuSelected.concat(menuSelected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newMenuSelected = newMenuSelected.concat(menuSelected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
      newMenuSelected = newMenuSelected.concat(
        menuSelected.slice(0, selectedIndex),
        menuSelected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    setMenuSelected(newMenuSelected);
    // setPriceArray(menuTotal);
  };

 
  // This will allow for the menu to go to the next page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // This will allow for more more rows to be shown on the menu e.g 10 rows instead of 5
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // This is used to help in identifying which rows quantity needs to be changes in rows (used with quantity select)
  const fullMenu = rows.map((n) => n.name);
  const rowIndex = (name) => {
    return fullMenu.indexOf(name);
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  
  const menuOrderTotal = menuSelected.reduce((totalPrice, price) => totalPrice + parseInt(price.price, 10), 0);
  
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
      <div>   
        <DialogContent>
          <form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
            <TextField
              id="outlined-select-branch"
              select
              label="Select"
              value={bookingBranch}
              onChange={handleChangeBB}
              fullWidth 
              helperText="Please select your branch"
              variant="outlined"
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              {branches.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
      
            <TextField 
              disabled={menuDisable}
              id="outlined-select-branch"
              select
              label="Select"
              value={menuBranch}
              onChange={handleChangeMenu}
              fullWidth 
              helperText="Please select your branch"
              variant="outlined"
            >
              
              {branchesMenu.map((option) => (
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
              <br></br>
              <br></br>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Time</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={timeBranch}
                  onChange={handleChangeTime}
                >
                  {branchesTime.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Only available times will show</FormHelperText>
              </FormControl>

            </Grid>
            <TableContainer component={Paper}>
              <Table  size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={1}>Selected Item</TableCell>
                    <TableCell align="right" colSpan={1}>Price</TableCell>
                    <TableCell align="right" colSpan={1}>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {menuSelected.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                      <React.Fragment>
                        <Typography>
                            {row.name}
                        </Typography>
                            {row.ingredients}
                      </React.Fragment>
                      </TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography>
                          <h1>Total: ${menuOrderTotal}</h1>
            </Typography>
          </Grid>
          </form>
          
        </DialogContent>
        <DialogActions>
        
          <Button onClick={handleCloseBooking, handleOpenMenu} color="primary">
            Proceed to Menu
          </Button>
        </DialogActions>

        


      <Dialog open={open2} onClose={handleCloseMenu} aria-labelledby="form-dialog-title" maxWidth>
        <DialogTitle id="form-dialog-title" style={{textAlign: 'center'}}>Le Bistrot D'Andre<br/>Add Menu Items</DialogTitle>
        <DialogContent>
          <form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
                <div className={classes.root}>
                  <Paper className={classes.paper}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                      <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                      >
                        <EnhancedTableHead
                          classes={classes}
                          numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}

                          onRequestSort={handleRequestSort}
                          rowCount={rows.length}
                        />
                        <TableBody>
                          {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                              const isItemSelected = isSelected(row.name);
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                <TableRow
                                  hover
                                  onClick={(event) => handleClick(event, row.name, row.ingredients, row.price, row.quantity)}
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row.name}
                                  selected={isItemSelected}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      checked={isItemSelected}
                                      inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                  </TableCell>
                                  <TableCell component="th" id={labelId} scope="row" padding="none">
                                  <React.Fragment>
                                    <Typography>
                                        {row.name}
                                    </Typography>
                                        {row.ingredients}
                                  </React.Fragment>
                                  </TableCell>
                                  <TableCell align="right">{row.price}</TableCell>
                                  <TableCell align="right">
                                    <FormControl className={classes.margin}>
                                        <Select
                                        labelId="demo-customized-select-label"
                                        id="demo-customized-select"
                                        value={row.quantity}
                                        onChange={(event) => handleChange(event, rowIndex(row.name))}
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
                              );
                            })}
                          {emptyRows > 0 && (
                            <TableRow >
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                  </Paper>
                </div>
            </Grid>
          </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMenu} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseMenu} color="primary">
            Add Items
          </Button>
        </DialogActions>
        </Dialog>
    </div>
  );
}
