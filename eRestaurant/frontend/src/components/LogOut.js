import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default class LogOut extends Component {
    constructor(props){
        super();
        this.state = {
            navigate: false
        }

        this.logout= this.logout.bind(this);

    }
    
    logout(){
        localStorage.clear('auth_token');
        localStorage.clear('user_type');
        localStorage.clear('username');
        localStorage.clear('is_auth');
        this.setState({navigate:true});
    }

    render(){
        if(this.state.navigate){
            return <Redirect to="/"/>
        }
        return <Button onClick={this.logout}>Log Out</Button>
    }
}
