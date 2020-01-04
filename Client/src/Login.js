import React, { Component } from 'react'
import { Header, Grid, Button, Form } from "semantic-ui-react";
import { Link } from 'react-router-dom'
import Notification from './Notification';
import './style.css';


export class Login extends Component {
  state = {
    username: '',
    password: '',
    loginError: false,
  }

  handleInputChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    const { username, password } = this.state;
    const getUsersCredentials = localStorage.getItem('usersCredentials');
    const userDetails = getUsersCredentials && JSON.parse(getUsersCredentials).find(user => user.email === username && user.password === password);

    if (userDetails && Object.keys(userDetails || {}).length) {
      localStorage.setItem("userLoggedIn", true);
      return window.location.href = '/';
    }
    this.setState({ loginError: true, errorMessage: 'The credentials are not correct try again!' });
  }

  clearError = () => {
    this.setState({ loginError: false, errorMessage: '' })
  }

  render() {
    const { username, password, loginError, errorMessage } = this.state;
    return (
      <Grid centered columns={1} id="login">
        <Notification title="Login Error" clearError={this.clearError} open={loginError} message={errorMessage} />
        <Grid.Row>
        <Grid.Column mobile={14} tablet={14}>
        <Header as="h1">Login Screen</Header>
          <Form>
            <Form.Field>
              <label>Email</label>
              <input
                type="email"
                name="username" 
                value={username} 
                placeholder='Email' 
                onChange={this.handleInputChange} 
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                value={password}
                placeholder='Password' 
                onChange={this.handleInputChange}
              />
            </Form.Field>
            <Header as="h4">If you aren't singed up press here: <Link to="/register">Sign Up</Link></Header>
            <Button onClick={this.handleSubmit} type='submit'>Login</Button>
          </Form>
        </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Login
