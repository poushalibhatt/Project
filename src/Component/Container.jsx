import React from 'react';
import LogIn from './LogIn';
import SignIn2 from './SignIn2';
import Dashboard from './Dashboard';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

function Container(){
 return (
     <BrowserRouter>
     <Switch>
        <Route exact path='/' component={LogIn} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/signin' component={SignIn2}/>
     </Switch>
     </BrowserRouter>
        
    
 )
}

export default Container