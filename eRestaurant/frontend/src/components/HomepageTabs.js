
import React from 'react';
import { Box } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ContactUs from './ContactUs.js';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import {axios_config} from '../config.js';

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

const HomepageTabs = () => {

    const [value, setValue] = React.useState(0);
    const handleChangetab = (event, newValue) => {
    setValue(newValue);
  };
  return(
  <Box p={1} flexGrow={1}>
                    <Paper square>
                    <Tabs value={value} onChange={handleChangetab} aria-label="simple tabs example">
                        <Tab label="Menu" {...a11yProps(0)} />
                        <Tab label="Locations" {...a11yProps(1)} />
                        <Tab label="Contact Us" {...a11yProps(2)} />
                    </Tabs>
                    </Paper>

                    <TabPanel value={value} index={0}>
                        <MenuItems/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Locations
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <ContactUs/>
                    </TabPanel>
                    </Box>
  )
}


class MenuItems extends React.Component {

  constructor(props){
    super();

    this.menuItemsToJSX = this.menuItemsToJSX.bind(this);
    this.getMenuItems = this.getMenuItems.bind(this);
    this.setDayTime = this.setDayTime.bind(this);

    this.state = {
      menu_rows: [],
      daytime: 'Breakfast'
    };
  }

  setDayTime(evt){
    this.setState({
      daytime:evt.target.value
    });

  }

  getMenuItems(){
    axios.get(`${axios_config["baseURL"]}api/menu/?menutype=${this.state.daytime}`)
      .then((response) => {
        if(response.data.length){
          let temp_rows = []
          response.data.map((menu_item) => {
            temp_rows.push({id: menu_item.id, name: menu_item.name, description: menu_item.description, price: menu_item.price});       
          });

          this.setState({
            menu_rows: temp_rows
          });
        }
      })
      .catch((error) => {
        console.log("Error in setMenu: ", error);
      });
  }

  menuItemsToJSX(row){
    return (
      <TableRow>
          <TableCell align="left">{row.name}</TableCell>
          <TableCell align="left">{row.description}</TableCell>
          <TableCell align="center">{row.price}</TableCell>
      </TableRow>  
          );
  }

  componentDidMount(){
    this.getMenuItems();
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.daytime !== this.state.daytime){
        this.getMenuItems();
    }
  }

  render(){
    return (
      [
      <Select
                style={{width:'265px'}}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={this.state.daytime}
                onChange={this.setDayTime}
                label="Menu"
                fullWidth
              >
              <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
              <MenuItem value={"Lunch"}>Lunch</MenuItem>
              <MenuItem value={"Dinner"}>Dinner</MenuItem>
  
        </Select>,
      <TableContainer >
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="center">Price</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                           {this.state.menu_rows.map(this.menuItemsToJSX, this)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    ]

    );
  }
}


export default HomepageTabs;

