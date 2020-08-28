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

const logo = require('./images/header13.jpg');

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


   

const HomePage = () => {
    const classes = useStyles();
    const [branch, setBranch] = React.useState('');
    const handleChange = (event) => {
        setBranch(event.target.value);
      };
  const [value, setValue] = React.useState(0);

  const handleChangetab = (event, newValue) => {
    setValue(newValue);
  };

    return(
        <div>
            <NavBar/>
            <Box>
                <img src={logo} style={{width: '100%'}}/>
            </Box>
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
                    <RegButton size="large">Book Now</RegButton>
                    </Box>

                    
                </Box>

            </Container>
        </div>
    )

}

export default HomePage;