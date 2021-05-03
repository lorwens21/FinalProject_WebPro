import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from '../../components/pages/Register';
import Login from '../../components/pages/Login';
import Dashboard from '../../components/pages/Dashboard';

const Routes = () => {
    return(
      <Router>
        <Switch>
          <Route path="/login">
             <Login />
          </Route>
          <Route path="/register">
             <Register />
          </Route>
          <Route exact path="/">
              <Dashboard/>
          </Route>
        </Switch>
      </Router>
    );
};

export default Routes;