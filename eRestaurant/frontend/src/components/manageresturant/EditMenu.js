import React from 'react';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import {Box} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import {axios_config} from '../../config.js';
import Cookies from 'js-cookie';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


/*
<Select
                style={{width:'265px'}}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                //value={}
                //onChange={}
                label="Select Menu"
                fullWidth
                >
                <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
                <MenuItem value={"Lunch"}>Lunch</MenuItem>
                <MenuItem value={"Dinner"}>Dinner</MenuItem>
                </Select>



                <Dialog open={this.state.menuItems} onClose={this.setMenuClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" style={{textAlign: 'center'}}>Le Bistrot D'Andre<br/>Selected Menu Items</DialogTitle>
                    <TableContainer >
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">Menu Item(s)</TableCell>
                            <TableCell align="center">Cost</TableCell>
                            <TableCell align="center">Remove Item</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                            <TableCell align="center">Cake</TableCell>
                            <TableCell align="center">$12</TableCell>
                            <TableCell align="center">
                            <Button 
                                variant="outlined" 
                                style ={{color:'#424242'}}
                                fullWidth>
                                Confirm</Button>
                            </TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <p>Add A Menu Item</p>
                    <Box>
                        <TextField
                        id="outlined-full-width"
                        label="Menu Name"
                        placeholder="Cake"
                        margin="normal"
                        variant="outlined"
                        />
                        <TextField
                        id="outlined-full-width"
                        label="Cost"
                        placeholder="12"
                        margin="normal"
                        variant="outlined"
                        />
                        <Button variant="contained"
                        margin="normal"
                        >Confirm</Button>
                    </Box>
                    <DialogActions>
                        <Button onClick={this.setMenuClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

*/

export default class EditMenu extends React.Component {
    constructor(props){
        super();

        this.state= {
            menu:'Breakfast'
        }
        this.updateMenu = this.updateMenu.bind(this);
    }

    updateMenu(menu_type){
        this.setState({
            menu:menu_type
        });
    }

    render(){
        return (
        <div>
            <Container maxWidth="lg">
                <Paper>
                <b><p   style={{textAlign: 'center', fontSize:'24px', paddingTop:'12px'}}>Active Menus</p></b>
                <SetMenu updateParentState={this.updateMenu}/>
                <TableContainer >
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">Menu Item Name</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                        </TableHead>

                        <TableBody>

                            <SetMenuRows menu={this.state.menu}/>
                            
                        
                        </TableBody>
                    </Table>
                </TableContainer>
                </Paper>
                </Container>    
                
            </div>
        )}
    
}

class SetMenu extends React.Component{
    constructor(props){
      super();
      this.state = {
        menu:'',
      }
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(evt){
      var menu_type = evt.target.value;
      this.props.updateParentState(menu_type);
      this.setState({
        menu: menu_type
      });
    }
  
    render(){
      return(
        <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">Menu</InputLabel>
              <Select
                style={{width:'265px'}}
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={this.state.menu}
                onChange={this.handleChange}
                label="Menu"
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

class DeleteMenuItem extends React.Component {
    constructor(props){
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        const csrftoken = Cookies.get('csrftoken');
        axios.patch(`${axios_config["baseURL"]}api/manage-menu/${this.props.id}/delete-meal/`, 
        {},
        {
            headers:{ 
                'Authorization': `Token ${localStorage.getItem('auth_token')}`,
                'X-CSRFToken': csrftoken
            }
        })
        .then((response) => {
            this.props.updateParentState();
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render(){
        return(
            <Button 
                variant="outlined" 
                style ={{color:'#424242'}}
                fullWidth
                onClick={this.handleClick}
                >
            Delete</Button>
        );
    }
}

class SetMenuRows extends React.Component {
    constructor(props){
        super();

        this.state = {
            menu_rows: []
        };
        this.menuItemsToJSX = this.menuItemsToJSX.bind(this);
        this.updateRows = this.updateRows.bind(this);
    }

    setMenuRows(){
        axios.get(`${axios_config["baseURL"]}api/menu/?menutype=${this.props.menu}`)
          .then((response) => {
            if(response.data.length){
              let temp_rows = []
              response.data.map((menu_item) => {
                temp_rows.push({ id:menu_item.id, name: menu_item.name, description: menu_item.description, price: menu_item.price});       
              });
              console.log(temp_rows);
              this.setState({
                menu_rows: temp_rows
              });
            }
          })
          .catch((error) => {
            console.log("Error in setMenu: ", error);
          });
      }

      componentDidMount(){
          this.setMenuRows();
      }

      componentDidUpdate(prevProps){
        if(prevProps.menu !== this.props.menu){
            this.setMenuRows();
        }
      }

      updateRows(){
        this.setMenuRows();
      }

      menuItemsToJSX(row){
        console.log("exe");
        return (
            <TableRow>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">
                    <DeleteMenuItem updateParentState={this.updateRows} id={row.id}/>
                </TableCell>
            </TableRow>  
                );
        
      }

    render(){
        return (
            [
            <AddMenuItem updateParentState={this.updateRows} menu={this.props.menu}/>,
            this.state.menu_rows.map(this.menuItemsToJSX, this)
            ]
            
        );
    }
}

class AddMenuItem extends React.Component {
    constructor(props){
        super();
        this.setName = this.setName.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.setPrice = this.setPrice.bind(this);
        this.postMenuItem = this.postMenuItem.bind(this);

        this.state = {
            name: '',
            description: '',
            price: 0
        }
    }

    postMenuItem(){
        const csrftoken = Cookies.get('csrftoken');
        if(this.checkEntries()){
            axios.post(`${axios_config["baseURL"]}api/manage-menu/`, {
                name:this.state.name,
                description: this.state.description,
                price: this.state.price,
                menu: this.props.menu
            },
            {
                headers:{ 
                    'Authorization': `Token ${localStorage.getItem('auth_token')}`,
                    'X-CSRFToken': csrftoken
                }
            })
            .then((response) => {
                console.log(response);
                this.props.updateParentState();
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    checkEntries(){
        if(this.state.name === '' || this.state.description === '' || this.state.price === 0){
            alert("Please complete all fields to create a new menu item.")
            return false;
        }
        if(Number(this.state.price) === NaN){
            alert("Price field should be number.");
            return false;
        }
        return true;
    }

    setName(evt){
        this.setState({
            name: evt.target.value
        });
    }

    setDescription(evt){
        this.setState({
            description: evt.target.value
        });
    }

    setPrice(evt){
        this.setState({
            price: evt.target.value
        });
    }

    render(){
        return(
            <TableRow>
                <TableCell align="center">
                    <TextField 
                    id="MealName" 
                    label="Menu Item Name" 
                    variant="outlined"
                    onChange={this.setName} 
                    fullWidth
                     />
                    </TableCell>
                    <TableCell align="center">
                    <TextField 
                        id="MealDescription" 
                        label="Menu Item Description" 
                        variant="outlined"
                        onChange={this.setDescription} 
                        fullWidth
                    />
                    </TableCell>
                    <TableCell align="center">
                        <TextField 
                        id="MealPrice" 
                        label="Menu Item Price" 
                        variant="outlined"
                        onChange={this.setPrice}  
                        fullWidth
                        />
                    </TableCell>
                    <TableCell align="center">
                        <Button 
                            variant="outlined" 
                            style ={{color:'#424242'}}
                            fullWidth
                            onClick={this.postMenuItem}
                        >
                        Add</Button>
                    </TableCell>
                            
            </TableRow>
        );
    }


}