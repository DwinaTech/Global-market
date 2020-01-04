import React, { Component } from "react";
import { Header, Grid, Button, Form } from "semantic-ui-react";
import Notification from './Notification';
import "./style.css";

export class Register extends Component {
  state = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errorMessage: '',
    errorOccurred: false,
  };

  handleInputChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    const { fullName, email, password, confirmPassword } = this.state;
    if (!fullName || !email || !password || !confirmPassword) {
        this.setState({ errorOccurred: true, errorMessage: 'You have to fille all fields' })
        return;
    }
    if (password !== confirmPassword) {
        this.setState({ errorOccurred: true, errorMessage: 'Your password are not match' })
        return;
    }
    
    try {
        const userCredentials = {
            id: Date.now(),
            name: fullName,
            email,
            password,
        }
        const usersDetails = JSON.parse(localStorage.getItem('usersCredentials')) || [];

        usersDetails.push(userCredentials);
        localStorage.setItem("usersCredentials", JSON.stringify(usersDetails));
        return window.location.href = '/login';
    } catch (error) {
        this.setState({ errorMessage: 'There is an error occurred try again!', errorOccurred: true })
    }
  };

  clearError = () => {
    this.setState({ errorOccurred: false, errorMessage: '' });
  }

  render() {
    const { email, password, confirmPassword, fullName, errorOccurred, errorMessage } = this.state;
    return (
      <Grid centered columns={1} id="register">
        <Notification open={errorOccurred} clearError={this.clearError} title="Error" message={errorMessage} />
        <Grid.Row>
          <Grid.Column mobile={14} tablet={14}>
            <Header as="h1">Register Screen</Header>
            <Form>
              <Form.Field>
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={fullName}
                  placeholder="Full Name"
                  onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.handleInputChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={this.handleInputChange}
                />
              </Form.Field>
              <Button onClick={this.handleSubmit} type="submit">
                Sign Up
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Register;
