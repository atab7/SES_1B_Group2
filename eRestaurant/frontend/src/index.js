import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';

import Home from "./components/HomePage";
import Register from "./components/register";
import Login from "./components/login";
import Profile from "./components/profiles/ProfilePage";
import About from './components/About.js'

// component={Home} 

const isManager = () => {
  return localStorage.getItem('user_type') === 'manager';
}

const isAuth = (token) => { 
  return localStorage.getItem('auth_token') !== null;
}

const LOGIN_URL = '/login';
const ProtectRoute = ({children}) => {
  if(!isAuth()){
    return <Redirect to={{
      pathname:LOGIN_URL,
      state: {illegal:true}
    }} /> //If you can pass a prop here (see how to pass props to Redirect components cause it is possible to pass props to Route component with render={...}), you can later on find out if user is directed here normally or with this illegal access.
  }
  return children;
}

var state = {
  legal:false
} 

ReactDOM.render(
  <BrowserRouter>
       <Switch>
        <Route 
          exact path="/" 
          render={(props) => (
            <Home {...props} />
          )
          }
        />
        <Route path="/register" component={Register} />
        <Route path="/about" component={About} />
        <Route path="/login" render={(props) => (
            <Login {...props} illegal={false} />
          )}/>
        
        <ProtectRoute>
          <Route path="/profile" component={Profile}/>
        </ProtectRoute>

      </Switch>
      </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();