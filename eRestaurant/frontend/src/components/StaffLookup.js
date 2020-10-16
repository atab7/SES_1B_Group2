import React from 'react';
import axios from 'axios';
import {axios_config} from '../config.js';
import Cookies from 'js-cookie';
import { makeStyles, withStyles, lighten } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
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
import FormHelperText from '@material-ui/core/FormHelperText';




class MakeBooking extends React.Component{
    constructor(props){
        super();


    }


    
    render(){
        return (
        <div>

        <Menu/>
                
        </div>);
    }
}





const ContinuousSlider = (props) => {
    const numOfPeople = [
        {
          value: '1',
          label: '1',
        },
        {
          value: '3',
          label: '3',
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
    
    const [value, setValue] = React.useState(30);
  
    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.updateParentState(newValue);
    };
  
    return (
      <div>
        <Slider
        min={1}
        max={10}
        step={1}
        marks={numOfPeople}
        value={value} 
        onChange={handleChange} 
        aria-labelledby="continuous-slider" />
      </div>
    );
  }

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

  function createData(fName, lName, pNumber, position) {
    return { fName, lName, pNumber, position};
  }
  

  
  const Menu = (props) => {

    const dummy_rows = [
      createData('Will', 'Smith', '0410101010', 'Staff'),
      createData('Will', 'Smith', '0410101010', 'Staff'),
      createData('Will', 'Smith', '0410101010', 'Staff'),
      createData('Will', 'Smith', '0410101010', 'Staff'),
      createData('Will', 'Smith', '0410101010', 'Staff'),
      createData('Will', 'Smith', '0410101010', 'Staff'),
      createData('Will', 'Smith', '0410101010', 'Staff'),
      createData('Will', 'Smith', '0410101010', 'Staff'),
      createData('Will', 'Smith', '0410101010', 'Staff'),
      createData('Will', 'Smith', '0410101010', 'Staff'),
      createData('Will', 'Smith', '0410101010', 'Staff'),
    ];

    const [rows, setRows] = React.useState(dummy_rows);
  
    
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
  
    /* Menu */
  
    
    
  
  
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
      { id: 'firstName', numeric: false, disablePadding: true, label: 'First Name' },
      { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
      { id: 'phoneNumber', numeric: false, disablePadding: false, label: 'Phone Number' },
      { id: 'position', numeric: false, disablePadding: false, label: 'Position' }
    ];
    
    function EnhancedTableHead(props) {
      const { classes, order, orderBy, numSelected, rowCount,
         onRequestSort } = props;
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
              Staff
            </Typography>
          )}
    
          
        </Toolbar>
      );
    };
    
    EnhancedTableToolbar.propTypes = {
      numSelected: PropTypes.number.isRequired,
    };
    
    const classes = useStyles();
    
    /* ------------------------------------For Menu----------------------------- */
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    /* This const stores the values of all the selected menu 
    items in the form of name, ingredients, price, quantity */
    const [menuSelected, setMenuSelected] = React.useState([]);

    //This event handler will sort the columns into ascending and descending order
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
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


    const isSelected = (name) => selected.indexOf(name) !== -1;
    
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleCloseMenu = () => {
      //setOpenMenu(false);
      props.updateParentState(menuSelected);
    };

    return (
      <div>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
                <div className={classes.root}>
                <TextField id="outlined-basic" label="First Name" variant="outlined" />
                <TextField id="outlined-basic" label="Last Name" variant="outlined" />
                <Button color="primary">
                    Search
                </Button>
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
                          rowCount={dummy_rows.length}
                        />
                        <TableBody>
                          {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {

                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                <TableRow
                                  hover
                                 
                                 

                                  tabIndex={-1}
                                  key={row.name}

                                >
                                <TableCell></TableCell>

                                  <TableCell component="th" id={labelId} scope="row" padding="none">
                                    {row.fName}
                                  </TableCell>
                                  <TableCell>
                                      {row.lName}
                                  </TableCell>
                                  <TableCell >
                                    {row.pNumber}
                                  </TableCell>
                                  <TableCell >
                                    {row.position}
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
      </div>

    )
  }



export default MakeBooking;