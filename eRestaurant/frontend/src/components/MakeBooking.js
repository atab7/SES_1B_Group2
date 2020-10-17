import React, { useEffect } from 'react';
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
import { Container, TextField, Typography } from '@material-ui/core';
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
        
        const date = new Date();
        const today = new Date(date.toLocaleDateString("en-US", {timeZone: "Australia/Sydney"}));
        this.state = {
            selected_restaurant: 0,
            booking_daytime: '',
            numpeople: 1,
            date: today.toLocaleDateString('fr-CA'),
            time: 0,
            menuSelected: [],
            menurows: [],
            discount_percentage: 0.0,
            menuOpen:false
        };
        this.selectRestaurant = this.selectRestaurant.bind(this);
        this.selectDayTime = this.selectDayTime.bind(this);
        this.selectNumOfPeople = this.selectNumOfPeople.bind(this);
        this.selectDate = this.selectDate.bind(this);
        this.selectTime = this.selectTime.bind(this);
        this.selectMenu = this.selectMenu.bind(this);
        this.setMenuRows = this.setMenuRows.bind(this);
        this.makeBooking = this.makeBooking.bind(this);
        this.setDiscountPercentage = this.setDiscountPercentage.bind(this);
        this.setMenuOpen = this.setMenuOpen.bind(this);
        this.setMenuClose = this.setMenuClose.bind(this);
    }

    setDiscountPercentage(discountPercentage){
      this.setState({
        discount_percentage: discountPercentage
      });
    }

    selectRestaurant(restaurant_id){
        this.setState({
            selected_restaurant: restaurant_id
        });
        
    }

    selectNumOfPeople(num_people){
        this.setState({
            numpeople: num_people
        });
    }

    selectDayTime(daytime){
        this.setState({
            booking_daytime: daytime
        });
    }

    selectDate(selected_date){
        this.setState({
            date: selected_date
        });
    }

    selectTime(selected_time){
        this.setState({
            time: selected_time
        });
    }

    selectMenu(menu_selected){
      this.setState({
        menuSelected: menu_selected
      });
    }

    setMenuRows(menu_rows){
      this.setState({
        menurows: menu_rows
      });
    }
    setMenuOpen(){
      this.setState({
        menuOpen: true
      });
    }
    setMenuClose(){
      this.setState({
        menuOpen: false
      });
    }

    makeBooking(){
      if(this.state.booking_daytime === '' || 
          this.state.date === '' ||  
          this.state.time === 0 || 
          this.state.menuSelected=== []){
        alert('Please fill in all the fields');
      }
      else {
      this.props.updateParentState();
      const csrftoken = Cookies.get('csrftoken');
      axios.post(`${axios_config["baseURL"]}api/make-booking/`, {
        restaurant: this.state.selected_restaurant,
        date: this.state.date,
        time: this.state.time.toString().concat(':00'),
        number_of_people: this.state.numpeople,
        day_time: this.state.booking_daytime,
        orders: this.state.menuSelected,
        customer: 'def_customer',
        discount_percentage: this.state.discount_percentage
      },
      {
        headers:{ 
            'Authorization': `Token ${localStorage.getItem('auth_token')}`,
            'X-CSRFToken': csrftoken
        }
    })
    .then((response) => {
      alert("Booking Made! Bon Appétit!");
    })
    .catch((error) => {
      if(error.response.status === 406){
        alert("You already have a booking for the service time (breakfast, dinner or lunch) of the date you have selected in this restaurant.");
      }
      if(error.response.status === 451){
        alert("The restaurant is full capacity during selected date and time.");
      }
    })
  }
    }
    
    render(){
        return (
        <div>
          <Container>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <RestaurantList updateParentState={this.selectRestaurant}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <SetMenu updateParentDayTime={this.selectDayTime} updateParentMenu={this.setMenuRows}/>
            </Grid>
            <Grid item xs={12}>
              <ContinuousSlider updateParentState={this.selectNumOfPeople}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateSelecter updateParentState={this.selectDate}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TimeSelecter date={this.state.date} daytime={this.state.booking_daytime} updateParentState={this.selectTime}/>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" fullWidth onClick={this.setMenuOpen}>Select Orders Now</Button>
            </Grid>
            <Grid item xs={12}>
              <SelectedItemsTable menuSelected={this.state.menuSelected} discount_percentage={this.state.discount_percentage}/>
            </Grid>
              <ApplyReward restaurant={this.state.selected_restaurant} updateParentState={this.setDiscountPercentage}/>
            <Grid item xs={12}>
              <Button variant="outlined" fullWidth onClick={this.makeBooking}>Create Booking</Button>
            </Grid>
        </Grid>
        </Container>
        <Dialog open={this.state.menuOpen} onClose={this.setMenuClose} aria-labelledby="form-dialog-title" maxWidth>
          <Container>
            <DialogTitle id="form-dialog-title" style={{textAlign: 'center'}}>Le Bistrot D'Andre<br/>Menu</DialogTitle>
              <Menu updateParentState={this.selectMenu} rows={this.state.menurows}/>
                <DialogActions>
                  <Button onClick={this.setMenuClose} color="primary">
                    COMPLETE
                  </Button>  
                </DialogActions>
                </Container>
        </Dialog> 
        
        </div>);
    }
}

class ApplyReward extends React.Component {
  constructor(props){
    super();

    this.setRewardCode = this.setRewardCode.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setButtonField = this.setButtonField.bind(this);

    this.state = {
      rewards:[],
      reward_code: ''
    }
  }

  setRewards(){
    if(this.props.restaurant !== 0) {
      axios.get(`${axios_config["baseURL"]}api/rewards/?restaurant=${this.props.restaurant}`, 
          {
              headers:{
                  'Authorization': `Token ${localStorage.getItem('auth_token')}`
              }
          })
          .then((response) => {
              try{
                  var response_rewards = response.data;
                  this.setState({
                      rewards: response_rewards,
                  })    
              }catch (e) {
                  this.setState({
                      rewards: [],
                  }) 
              }
          })
          .catch((error) => {
              console.log(error);
          });
    }
  }

  componentDidMount(){
    this.setRewards();
  }

  componentDidUpdate(prevProps){
    if(prevProps.restaurant !== this.props.restaurant){
      this.setRewards();
    }
  }
  
  setRewardCode(evt){
    this.setState({
      reward_code: evt.target.value
    });
  }

  handleClick(evt){
    if(this.state.reward_code === ''){
      alert('Please enter a reward code before applying reward.');
      return null;
    }
    var reward;
    var found = false;
    for(reward of this.state.rewards){
      if(reward.code === this.state.reward_code){
        this.props.updateParentState(reward.points_percent/100);
        found = true;
        break;
      }
    }

    if(!found){
      alert('No matching reward code is found!');
    }
    
  }

  setButtonField(){
    if(this.props.restaurant === 0){
      return(
        <Grid item xs={12} sm={5}>
          <Button disabled='true' variant="outlined" style={{marginTop:'8px'}}fullWidt>Apply Reward</Button>
        </Grid>
      )
    }else{
      return(
        <Grid item xs={12} sm={5}>
          <Button variant="outlined" style={{marginTop:'8px'}}fullWidth onClick={this.handleClick} >Apply Reward</Button>
        </Grid>
      )
    }
  }

  render(){
    return (
        [
        <Grid item xs={12} sm={7}>
        <TextField
        placeholder="Enter Reward Code Here"
        fullWidth
        id="Reward" 
        label="Reward" 
        onChange = {this.setRewardCode}
        variant="outlined" />
        </Grid>,
        this.setButtonField()
        ]
      )
  }

}

class SetMenu extends React.Component{
  constructor(props){
    super();
    this.state = {
      daytime:'',
      menu_rows:[]
    }

    this.handleChange = this.handleChange.bind(this);
  }

  setMenuRows(daytime){
    axios.get(`${axios_config["baseURL"]}api/menu/?menutype=${daytime}`)
      .then((response) => {
        if(response.data.length){
          let temp_rows = []
          response.data.map((menu_item) => {
            temp_rows.push({id: menu_item.id, name: menu_item.name, ingredients: menu_item.description, price: menu_item.price , quantity: 1});       
          });

          this.setState({
            menu_rows: temp_rows
          });
          this.props.updateParentMenu(this.state.menu_rows);
        }
      })
      .catch((error) => {
        console.log("Error in setMenu: ", error);
      });
  }
  

  handleChange(evt){
    var day_time = evt.target.value;
    this.props.updateParentDayTime(day_time);
    this.setState({
      daytime: day_time
    });
    this.setMenuRows(day_time);
  }

  render(){
    return(
      <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Menu</InputLabel>
            <Select
              style={{width:'265px'}}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={this.state.daytime}
              onChange={this.handleChange}
              label="Day Time"
              fullWidth
            >
            <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
            <MenuItem value={"Lunch"}>Lunch</MenuItem>
            <MenuItem value={"Dinner"}>Dinner</MenuItem>

            </Select>
      </FormControl>
    );
  }

}

class RestaurantList extends React.Component {

    constructor(props){
        super();
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            restaurants: [],
        };
    }

    getRestaurants(){
        axios.get(`${axios_config["baseURL"]}api/restaurants/`)
        .then((response) => {
            this.setState({
                restaurants: response.data
            });
        })
    }

    componentDidMount(){
        this.getRestaurants();
    }

    handleChange(evt){
        var restaurant_id = evt.target.value;
        console.log("Evt id: ", restaurant_id);
        this.props.updateParentState(restaurant_id);
    }

    setRestaurants(restaurant){
        return (<MenuItem value={restaurant.id}>{restaurant.name}</MenuItem>);
    }

    render(){
        return (
            <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Restaurant</InputLabel>
            <Select style={{width:'265px'}}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={this.state.selected_restaurant}
              onChange={this.handleChange}
              label="Restaurant"
              fullWidth
            >
            {this.state.restaurants.map(this.setRestaurants, this)}

            </Select>
          </FormControl>);
    }
}

class DateSelecter extends React.Component {

    constructor(props){
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt){
        var date = evt.target.value;
        this.props.updateParentState(date);
    }

    getAussieISODateString(){
      const date = new Date();
      const today = new Date(date.toLocaleDateString("en-US", {timeZone: "Australia/Sydney"}));
      return today.toLocaleDateString('fr-CA');
    }

    render(){
      const todayDate = this.getAussieISODateString();
      
      //console.log(todayDate);
      //console.log(today.toLocaleDateString("en-US", {timeZone: "Australia/Sydney"}));
        return (
            <TextField
                fullWidth
                id="date"
                label="Booking Date"
                type="date"
                defaultValue="values.someDate"
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ min: todayDate }} 
            />);
        }
}

class TimeSelecter extends React.Component{
    constructor(props){
        super();
        this.state = {
            time: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.setListItems = this.setListItems.bind(this);
    }

    toTwelveHourFormat(hour){
      if(hour === 0){
        return '12 AM';
      }
      if(hour === 12){
        return '12 PM';
      }
      if(hour > 12){
        return (hour - 12).toString().concat(' PM')
      }else{
        return hour.toString().concat(' AM');
      }
    }

    getAussieISODateString(){
      const date = new Date();
      const today = new Date(date.toLocaleDateString("en-US", {timeZone: "Australia/Sydney"}));
      return today.toLocaleDateString('fr-CA');
    }

    listHours(starthour, endhour){
      let date = new Date();
      var today = this.getAussieISODateString();
      var now = date.getHours();
      
      var hour = starthour;
      if(today === this.props.date){
        hour = date.getHours()+1;
        if(hour < starthour){
          hour = starthour;
        }else if(hour === starthour){
          hour = starthour+1;
        }
      }

      var JSXs = [];
      for(let i = hour; i <= endhour; i++){
        JSXs.push(<MenuItem value={i}>{this.toTwelveHourFormat(i)}</MenuItem>);
      }
      return JSXs;
    }

    setListItems(){
      this.listHours();
        if(this.props.daytime === 'Breakfast'){
          return this.listHours(8, 11);

        }else if(this.props.daytime === 'Lunch'){
          return this.listHours(12, 15);

        }else if(this.props.daytime === 'Dinner'){
          return this.listHours(17, 22);

        }
    }

    componentDidUpdate(prevProps){
      if(this.props.daytime !== prevProps.daytime){
        this.forceUpdate();
      }
    }

    handleChange(evt){
        var i_time = evt.target.value;
        this.props.updateParentState(i_time);
        this.setState({
          time:i_time
        });
    }

    render(){
        return (
            <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">Time</InputLabel>
                <Select
                style={{width:'265px'}}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={this.state.time}
                onChange={this.handleChange}
                label="Times"
                >
                {this.setListItems()}
                </Select>
            </FormControl>
        );
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

  
  function createData(id, name, ingredients, price, quantity) {
    return {id, name, ingredients, price, quantity};
  }

  const Menu = (props) => {

    /*
    const dummy_rows = [
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
    */
    const [rows, setRows] = React.useState(props.rows);

    useEffect(() => {
      setRows(props.rows);
    }, [props.rows]);
    
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
            </Typography>
          )}
    
          
        </Toolbar>
      );
    };
    
    EnhancedTableToolbar.propTypes = {
      numSelected: PropTypes.number.isRequired,
    };
    
    const classes = useStyles();
    
    const handleChange = (event, number) => {
        //console.log(number);
        //console.log("evt: ", event.target.value);
        var copy_rows = rows;
        copy_rows[number].quantity = event.target.value;
        setRows(copy_rows);
    };

    const [isChecked, setIsChecked] = React.useState(false);

    //Event handler for branches
    
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
    const handleClick = (event, id, name, ingredients, price, quantity) => {
        const selectedIndex = selected.indexOf(name);
        const selectedRows = [createData(id, name, ingredients, price*quantity, quantity)];

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
                                  onClick={(event) => handleClick(event, row.id, row.name, row.ingredients, row.price, row.quantity)}
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
          <Button variant="outlined" fullWidth onClick={handleCloseMenu}>
          Add Items
          </Button>
      </div>

    )
  }
  

  const SelectedItemsTable = (props) => {
    var menuOrderTotal = props.menuSelected.reduce((totalPrice, price) => totalPrice + parseInt(price.price, 10), 0);

    const setTotalDisplayPrice = (menuOrderTotal) => {
      if(props.discount_percentage){
        return (
          <div>
            <h1><strike>Total: ${menuOrderTotal}</strike></h1>
            <h1>After Reward: ${menuOrderTotal - (menuOrderTotal*props.discount_percentage)} </h1>
          </div>
        );
      }else{
        return (
          <h1>Total: ${menuOrderTotal}</h1>
        );
      }
    }

    return (
    <div>
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
                {
                props.menuSelected.map((row) => (
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
            {setTotalDisplayPrice(menuOrderTotal)}
        </Typography>
      </div>
      );
  }

export default MakeBooking;