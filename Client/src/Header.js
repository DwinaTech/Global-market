import React, { Component } from "react";
import { Icon, Menu, Sidebar, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class index extends Component {
  state = { visible: false };

  handleMenu = () => {
    this.setState({ visible: !this.state.visible });
  };

  handleLogOut = e => {
    e.preventDefault();
    localStorage.setItem("userLoggedIn", false);
    window.location.reload();
  };

  render() {
    const { visible } = this.state;
    const { handleMenu, handleLogOut } = this;
    const isLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
    
    return (
      <React.Fragment>
        <Menu style={{ borderRadius: "inherit" }}>
          <Menu.Item name="app-menu" position="right" onClick={this.handleMenu}>
            <Header as="h3">
              <Icon name={visible ? "times" : "bars"} />
            </Header>
          </Menu.Item>
        </Menu>
        {renderSideBar({ visible, handleMenu, isLoggedIn, handleLogOut })}
      </React.Fragment>
    );
  }
}

const renderSideBar = ({ visible, isLoggedIn, handleMenu, handleLogOut }) => (
  <Sidebar
    as={Menu}
    animation="overlay"
    icon="labeled"
    inverted
    vertical
    visible={visible}
    width="thin"
  >
    <Link to="/" onClick={handleMenu}>
      <Menu.Item>
        <Icon name="home" />
        Home
      </Menu.Item>
    </Link>
    <Link to="/contact" onClick={handleMenu}>
      <Menu.Item>
        <Icon name="text telephone" />
        Contact
      </Menu.Item>
    </Link>
    <Link to="/about" onClick={handleMenu}>
      <Menu.Item>
        <Icon name="info circle" />
        About
      </Menu.Item>
    </Link>
    <Link to="/login" onClick={isLoggedIn ? handleLogOut : handleMenu}>
      <Menu.Item>
        <Icon name={isLoggedIn ? "lock open" : "lock"} />
        {isLoggedIn ? "Logout" : "Login"}
      </Menu.Item>
    </Link>
    {isLoggedIn ? (
      <Link to="/profile" onClick={handleMenu}>
        <Menu.Item>
          <Icon name="user" />
          Profile
        </Menu.Item>
      </Link>
    ) : null}
  </Sidebar>
);
