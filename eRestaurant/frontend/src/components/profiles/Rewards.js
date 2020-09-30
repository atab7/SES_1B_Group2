
import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

      this.updateState = this.updateState.bind(this);
      this.state = {
          rewards: [],
      }

    }

    getManageRewardJSX(reward){
        return (
            <TableBody>
                        <TableRow>
                            <TableCell>{reward.id}</TableCell>
                            <TableCell align="center">{reward.code}</TableCell>
                            <TableCell align="center">{`${reward.points_percent}%`}</TableCell>
                            <TableCell align="center">
                                <DeleteReward updateParentState={this.updateState} toBeRemoved={reward.id}/>
                            </TableCell>
                        </TableRow>
                        </TableBody>
        )
    }

    setManageRewards(token){
        axios.get(`${axios_config["baseURL"]}api/manageRewards/`, 
        {
            headers:{
                'Authorization': `Token ${token}`
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

    updateState(){
        this.setManageRewards(localStorage.getItem('auth_token'));
    }

    componentDidMount(){
        this.setManageRewards(localStorage.getItem('auth_token'));
    }



    render(){
        return(
            <div>
                <Container maxWidth="md">
                <Paper>
                <b><p   style={{textAlign: 'center', fontSize:'24px', paddingTop:'12px'}}>On Going Rewards</p></b>
                <TableContainer >
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Reward ID</TableCell>
                            <TableCell align="center">Promocode</TableCell>
                            <TableCell align="center">Discount Percentage (%)</TableCell>
                            <TableCell align="center">Delete Promocode
                            </TableCell>
                        </TableRow>
                        </TableHead>
                        { (this.state.rewards.length) ? this.state.rewards.map(this.getManageRewardJSX, this) : <h1 align="center">No Active Rewards Found</h1>}

                    </Table>
                    </TableContainer>
                    </Paper>
               <AddReward updateParentState={this.updateState}/>
               </Container>
            </div>
        )
    }
}  

class DeleteReward extends React.Component{
    constructor(props){
        super();
        this.removeReward = this.removeReward.bind(this);
    }

    removeReward(){
        const csrftoken = Cookies.get('csrftoken');
        axios.patch(`${axios_config["baseURL"]}api/manageRewards/${this.props.toBeRemoved}/remove-reward/`, 
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
        return (<Button 
            variant="outlined" 
            style ={{color:'#424242'}}
            onClick={ this.removeReward }
            fullWidth>
            Remove</Button>)
    }
}

class AddReward extends React.Component {
    constructor(props){
        super();
        this.setDiscountPercentage = this.setDiscountPercentage.bind(this);
        this.setPromoCode = this.setPromoCode.bind(this);
        this.postReward = this.postReward.bind(this);

        this.state = {
            promo_code: '',
            discount_percentage: 'init',
        }
    }
    
    setPromoCode(evt){
        this.setState({
            promo_code: evt.target.value
        });
    }

    setDiscountPercentage(evt){
        this.setState({
            discount_percentage: evt.target.value
        });
    }

    checkReward(){
        if(this.state.promo_code === '' || this.state.discount_percentage === 'init'){
            alert("Please enter a promo code and a discount percentage!");
            return false;
        }
        
        var percentage = Number(this.state.discount_percentage); 
        if(Number.isNaN(percentage)){
            alert("Please enter a number in discount percentage");
            return false;
        }

        if(percentage <= 0){
            alert("Discount percentage cannot be 0 or lower.");
            return false;
        }
        
        if(percentage/100 > 1){
            alert("Please enter a number between 1 and 100 as discount percentage.");
            return false;
        }
    }

    postReward(){
        const csrftoken = Cookies.get('csrftoken');
        
        if(this.checkReward()){
            axios.post(`${axios_config["baseURL"]}api/manageRewards/`, {
                code:this.state.promo_code,
                points_percent: Number(this.props.points_percent)
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

    render(){
        return ( 
        <Grid container spacing={2}>
            <Grid item xs={12} style={{height:80}}>
             <b><p  style={{textAlign: 'center', fontSize:'24px'}}>Add Rewards</p></b>
            </Grid>
            <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
            <TextField
                placeholder="SAVE20"
                fullWidth
                id="rewardCode" 
                label="Enter PromoCode" 
                variant="outlined" 
                onChange={this.setPromoCode}/>
            </Grid>
            <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
            <TextField
                placeholder="20"
                fullWidth
                id="rewardCode" 
                label="Enter Discount Percentage" 
                variant="outlined"
                onChange={this.setDiscountPercentage} />
            </Grid>
            <Grid item xs={12} style={{marginLeft: '15px', marginRight:'15px'}}>
                <Button 
                variant="outlined" 
                style ={{color:'#424242'}}
                onClick={this.postReward}
                fullWidth
                >
                Add Promocode</Button>
                </Grid>


        </Grid>)
    }
}


/*
<TableBody>
                        <TableRow>
                            <TableCell>100000</TableCell>
                            <TableCell align="center">SAVE5</TableCell>
                            <TableCell align="center">5</TableCell>
                            <TableCell align="center">
                            <Button 
                                variant="outlined" 
                                style ={{color:'#424242'}}
                                fullWidth>
                                Remove</Button>
                            </TableCell>
                        </TableRow>
                        </TableBody>
                        <TableBody>
                        <TableRow>
                            <TableCell>100001</TableCell>
                            <TableCell align="center">SAVE10</TableCell>
                            <TableCell align="center">10</TableCell>
                            <TableCell align="center">
                            <Button 
                                variant="outlined" 
                                style ={{color:'#424242'}}
                                fullWidth>
                                Remove</Button>
                            </TableCell>
                        </TableRow>
                        </TableBody>
                        <TableBody>
                        <TableRow>
                            <TableCell>100002</TableCell>
                            <TableCell align="center">SAVE20</TableCell>
                            <TableCell align="center">20</TableCell>
                            <TableCell align="center">
                            <Button 
                                variant="outlined" 
                                style ={{color:'#424242'}}
                                fullWidth>
                                Remove</Button>
                            </TableCell>
                        </TableRow>
                        </TableBody>

*/
