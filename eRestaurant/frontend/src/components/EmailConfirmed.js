import React from 'react';

class EmailConfirmed extends React.Component{
    render(){
        return(<h1>Your email is confirmed. Please Login to start using your account.</h1>)
    }
}

class EmailNotExists extends React.Component{
    render(){
        return(<h1>This email is not registered. Please register first.</h1>)
    }
}

export { EmailConfirmed, EmailNotExists};