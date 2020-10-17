
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
                        <TableContainer >
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="center">Menu Item Name</TableCell>
                                <TableCell align="center">Menu Price</TableCell>
                                <TableCell align="center">Menu Description</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            <TableRow>
                                <TableCell align="center">Burger</TableCell>
                                <TableCell align="center">description</TableCell>
                                <TableCell align="center">100</TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Locations
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Contact Us
                    </TabPanel>

                    </Box>
  )
}
export default HomepageTabs;

