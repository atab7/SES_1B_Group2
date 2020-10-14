import React from 'react';
import axios from 'axios';
import {axios_config} from '../config.js';
import Cookies from 'js-cookie';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import { TextField } from '@material-ui/core';



class MakeBooking extends React.Component{
    constructor(props){
        super();

        this.state = {
            selected_restaurant: '',
            booking_daytime: 0,
            numpeople: 1,
            date: '',
            time: 0,
        };
        this.selectRestaurant = this.selectRestaurant.bind(this);
        this.selectDayTime = this.selectDayTime.bind(this);
        this.selectNumOfPeople = this.selectNumOfPeople.bind(this);
        this.selectDate = this.selectDate.bind(this);
        this.selectTime = this.selectTime.bind(this);
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

    selectDayTime(evt){
        this.setState({
            booking_daytime: evt.target.value
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
    
    render(){
        return (
        <div>
            <RestaurantList updateParentState={this.selectRestaurant}/>
            
            <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Select a Restaurant</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={this.state.booking_daytime}
              onChange={this.selectDayTime}
              label="Day Time"
            >
            <MenuItem value={1}>Breakfast</MenuItem>
            <MenuItem value={2}>Lunch</MenuItem>
            <MenuItem value={3}>Dinner</MenuItem>

            </Select>
          </FormControl>
        <ContinuousSlider updateParentState={this.selectNumOfPeople}/>
        <DateSelecter updateParentState={this.selectDate}/>
        <TimeSelecter daytime={this.state.booking_daytime} updateParentState={this.selectTime}/>
        <p>{this.state.time}</p>
                
        </div>);
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
            <InputLabel id="demo-simple-select-outlined-label">Select a Restaurant</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={this.state.selected_restaurant}
              onChange={this.handleChange}
              label="Restaurant"
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

    render(){
        return (
            <TextField
                id="date"
                label="Booking Date"
                type="date"
                defaultValue="values.someDate"
                onChange={this.handleChange}
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

    setItem(){

    }

    setListItems(){
        if(this.props.daytime === 1){
            return(
                [
                <MenuItem value={8}>8 AM</MenuItem>,
                <MenuItem value={9}>9 AM</MenuItem>,
                <MenuItem value={10}>10 AM</MenuItem>,
                <MenuItem value={11}>11 AM</MenuItem>,
                ]
            )

        }else if(this.props.daytime === 2){
            return(
                [
                    <MenuItem value={12}>12 PM</MenuItem>,
                    <MenuItem value={13}>1 PM</MenuItem>,
                    <MenuItem value={14}>2 PM</MenuItem>,
                    <MenuItem value={15}>3 PM</MenuItem>,
                ]
            )

        }else if(this.props.daytime === 3){
            return(
                [
                    <MenuItem value={17}>5 PM</MenuItem>,
                    <MenuItem value={18}>6 PM</MenuItem>,
                    <MenuItem value={19}>7 PM</MenuItem>,
                    <MenuItem value={20}>8 PM</MenuItem>,
                    <MenuItem value={21}>9 PM</MenuItem>,
                    <MenuItem value={22}>10 PM</MenuItem>,
                ]
            )

        }
    }

    handleChange(evt){
        var time = evt.target.value;
        this.props.updateParentState(time);
    }

    render(){
        return (
            <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">Select a Time</InputLabel>
                <Select
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

export default MakeBooking;