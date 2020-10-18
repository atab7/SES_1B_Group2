
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Cookies from 'js-cookie';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {axios_config} from '../../config.js';


export default class Rewards extends React.Component {
    constructor(props){
      super();
      this.state = {
      }

    }
    

    render(){
        return (
        <Container>
        <TableContainer >
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="center">Reward Code</TableCell>
                                <TableCell align="center">Reward Discount Amount</TableCell>
                                <TableCell align="center">Restaurant</TableCell>
                            </TableRow>
                            </TableHead>
                            <ListRewards/>
                        </Table>
        </TableContainer>
        </Container>
        )
    }
}

class ListRewards extends React.Component {

    constructor(props){
        super();

        this.rewardToJSX = this.rewardToJSX.bind(this);

        this.state = {
            rewards: []
        }
    }

    rewardToJSX(reward){
        return (
            <TableRow>
                <TableCell align="center">{reward.code}</TableCell>
                <TableCell align="center">{reward.points_percent}</TableCell>
                <TableCell align="center">{reward.restaurant_name}</TableCell>
            </TableRow>
        )
    }

    getRewards(){
        axios.get(`${axios_config["baseURL"]}api/rewards/`, 
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

    componentDidMount(){
        this.getRewards();
    }

    render(){
        return(
            <TableBody>
                {this.state.rewards.map(this.rewardToJSX, this)}
            </TableBody>
        )
    }
}

