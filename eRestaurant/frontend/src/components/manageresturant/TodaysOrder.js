import React from 'react';
import { Container, TableContainer } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import {axios_config} from '../../config.js';
import Cookies from 'js-cookie';


export default class TodaysOrder extends React.Component {
    constructor(props){
      super();
    }
    
    render(){
        return(
        <Container>
        <TableContainer>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="left">Order</TableCell>
                    <TableCell align="center">Booking Time</TableCell>
                    <TableCell align="center">Customer</TableCell>
                    <TableCell align="center">Close</TableCell>
                </TableRow>
            </TableHead>
        <ListOrders/>
        </Table>
        </TableContainer>
        </Container>
        )   
    }       
}

class ListOrders extends React.Component {
    constructor(props){
        super();
        this.orderToJSX = this.orderToJSX.bind(this);
        this.getOrders = this.getOrders.bind(this);
        
        const date = new Date();
        const today = new Date(date.toLocaleDateString("en-US", {timeZone: "Australia/Sydney"}));
        this.state = {
            orders:[],
            today: today.toLocaleDateString('fr-CA')
        };
    }

    orderToJSX(order){
        return(
            <TableRow>
                    <TableCell align="left">{order.name}</TableCell>
                    <TableCell align="center">{order.time}</TableCell>
                    <TableCell align="center">{order.customer}</TableCell>
                    <TableCell align="center">
                        <CloseOrder updateParentState={this.getOrders} id={order.id}/>
                    </TableCell>
                </TableRow>
        );
    }

    componentDidMount(){
        this.getOrders()
    }


    getOrders(){
        axios.get(`${axios_config["baseURL"]}api/orders/?date=${this.state.today}`, 
        {
            headers: { 'Authorization': `Token ${localStorage.getItem('auth_token')}`}
        })
        .then((response) => {
            this.setState({
                orders: response.data
            })
        })
    }

    render(){
        return(
            <TableBody>
                {this.state.orders.map(this.orderToJSX, this)}
            </TableBody>
        );
    }

}

class CloseOrder extends React.Component {
    constructor(props){
        super();
        this.closeOrder = this.closeOrder.bind(this);
    }

    closeOrder(){
        const csrftoken = Cookies.get('csrftoken');
        axios.patch(`${axios_config["baseURL"]}api/orders/${this.props.id}/close-order/`, 
        {},
        {
            headers:{ 
                'Authorization': `Token ${localStorage.getItem('auth_token')}`,
                'X-CSRFToken': csrftoken
            }
        })
        .then((response) => {
            this.props.updateParentState();
            //console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });

    }

    render(){
        return(
            <Button onClick={this.closeOrder} color="primary">CLOSE</Button>
        );
    }
}