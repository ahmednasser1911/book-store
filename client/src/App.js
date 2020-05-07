import React , {Fragment , useEffect} from 'react';
import { BrowserRouter as Router , Route, Switch } from "react-router-dom";
import './App.css';
import { Provider } from "react-redux";
import store from "./store";
import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index';
import Login from './components/user/Login'
import Cart from './components/cart/Cart';
import Register from './components/user/Register'
import {getUser} from './actions/auth'
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './components/routeing/PrivateRoute';
import Alert from './components/layout/Alert'
// run every time app loads
// if a token stord in local storage ,
// it will be set in global headers so we can easily use it for every protected routes

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // get the auth user and set the token to headers when app launches
  useEffect(() => {
    store.dispatch(getUser());
  } , []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment >
          <Navbar/>
          <Alert />
          <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/cart" component={Cart} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
