import React from 'react';
import Header from './Header';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import About from './About';
import Home from './Home';
import Contact from './Contact';
import Login from './Login';
import Profile from './Profile';
import Register from './Register';

const auth = Component => {
  return () => {
    const isLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
    if (isLoggedIn) {
      return <Component />;
    }
    return <Redirect to='/login'/>;
  }
}

function Routes() {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/login" component={Login} />
      <Route exact path='/profile' component={auth(Profile)} />
      <Route exact path="/register" component={Register} />
    </Router>
  );
}

export default Routes;
