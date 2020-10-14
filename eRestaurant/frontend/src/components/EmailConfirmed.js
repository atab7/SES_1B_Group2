import React from 'react';
import NavBar from './NavBar.js';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import {Link } from "react-router-dom";

class EmailConfirmed extends React.Component{
    render(){
        return(
            <div>
                <NavBar/>
                <Container style={{marginTop:'40px'}}>
                <Typography variant="h3" style={{textAlign:'center', marginTop:'40px'}} gutterBottom>
                    Your Email Has Been Confirmed.
                </Typography>
                <Typography variant="body1" style={{textAlign:'center', marginTop:'40px'}} gutterBottom>
                    You can now login and make bookings with Le Bistrot d'Andre.<br/>
                    Please click the button below to login and get started.
                </Typography>
                <Box textAlign='center' style={{marginTop:'20px'}}>
                <Link to="/login" style={{ textDecoration: 'inherit', color: 'inherit'}}>    
                    <Button variant="contained"> Login</Button>
                </Link>
                </Box>
                </Container>
            </div>
        )
    }
}

class EmailNotExists extends React.Component{
    render(){
        return(
        <div>
            <NavBar/>
            <Container style={{marginTop:'40px'}}>
            <Typography variant="h3" style={{textAlign:'center', marginTop:'40px'}} gutterBottom>
            This email is not registered.
            </Typography>
            <Typography variant="body1" style={{textAlign:'center', marginTop:'40px'}} gutterBottom>
                Please register an account first.<br/>
                Please click the button below to register an account.
            </Typography>
            <Box textAlign='center' style={{marginTop:'20px'}}>
            <Link to="/register" style={{ textDecoration: 'inherit', color: 'inherit'}}>    
                <Button variant="contained">Register</Button>
            </Link>
            </Box>
            </Container>
        </div>
        )
    }
}

export { EmailConfirmed, EmailNotExists};