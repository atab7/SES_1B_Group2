import React from 'react';
import NavBar from './NavBar'
import { Box } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles} from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Header from './images/frenchpic.jpeg';
import Background from './images/defaultBackground.jpg';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    flexBut: {
        flexGrow: 1,
      },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
      },
  }));

var headerImg = {
  width: "100%",
  height: "350px",
  backgroundImage: `url(${Header})`,
};

var backgroundImg = {
  width: "100%",
  height: "750px",
  backgroundImage: `url(${Background})`
};
  


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

/*value of booking slider shows above*/
function valuetext(value) {
  return `${value}`;
}

const RegButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(grey[900]),
      backgroundColor: grey[800],
      '&:hover': {
        backgroundColor: grey[700],
      },
      height: "40px",
      width: "150px"
    },
  }))(Button);

/* These are just default branches link to database later  */
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
   

const HomePage = () => {
  const classes = useStyles();

  /* Branch select on homepage */
  const [branch, setBranch] = React.useState('');
  const handleChange = (event) => {
      setBranch(event.target.value);
    };
  /* Tab Change on homepage */  
  const [value, setValue] = React.useState(0);
  const handleChangetab = (event, newValue) => {
    setValue(newValue);
  };
  /* Booking */
  const [open, setOpenBooking] = React.useState(false);
  const handleOpenBooking = () => {
    setOpenBooking(true);
  };
  const handleCloseBooking = () => {
    setOpenBooking(false);
  };
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
  

    return(
        <div>
            <NavBar/>
            <Box style={ headerImg }>
            </Box>
            <Box style={ backgroundImg }>
            <Container maxWidth="lg">
                <Box display="flex" p={1}>
                    <Box p={1}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-autowidth-label">Branch</InputLabel>
                        <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={branch}
                        onChange={handleChange}
                        autoWidth
                        >
                        <MenuItem value={10}>Branch</MenuItem>
                        <MenuItem value={20}>Branch 2</MenuItem>
                        <MenuItem value={30}>Branch 3</MenuItem>
                        </Select>
                        <FormHelperText>Select Branch</FormHelperText>
                    </FormControl>
                    </Box> 
                    <Box p={1} flexGrow={1}>
                    <Paper square>
                    <Tabs value={value} onChange={handleChangetab} aria-label="simple tabs example">
                        <Tab label="Menu" {...a11yProps(0)} />
                        <Tab label="Rewards" {...a11yProps(1)} />
                        <Tab label="Locations" {...a11yProps(2)} />
                        <Tab label="Contact Us" {...a11yProps(3)} />
                    </Tabs>
                    </Paper>

                    <TabPanel value={value} index={0}>
                        Menu
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Rewards
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Locations
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Contact Us
                    </TabPanel>

                    </Box>

                    <Box p={1}>
                    <RegButton size="large" onClick={handleOpenBooking}>Book Now</RegButton>
                    <Dialog open={open} onClose={handleCloseBooking} aria-labelledby="form-dialog-title">
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
                            getAriaValueText={valuetext}
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
                        <Button onClick={handleCloseBooking} color="primary">
                          Proceed to Menu
                        </Button>
                      </DialogActions>
                    </Dialog> 
                    </Box>

                    
                </Box>

            </Container>
            </Box>
        </div>
    )
}
export default HomePage;