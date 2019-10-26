import React from "react";
import { NavLink } from "react-router-dom";

const token = localStorage.getItem("access_token");
const logout = () => localStorage.removeItem("access_token");
export default class NavLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      register: false,
      signin: false
    };
  }

  

  render() {
    return token ? (
      <div
        className={
          this.props.width <= 768
            ? "collapsible-body btn-container"
            : "btn-container"
        }
        onClick={() => this.props.closeMenu()}
      >
        <NavLink to="/">View Notes</NavLink>
        <NavLink to="/add-note">Add Note</NavLink>
        <NavLink to="/login" onClick={() => logout()}>
          Logout
        </NavLink>
      </div>
    ) : (
      <div
        className={
          this.props.width <= 768
            ? "collapsible-body btn-container"
            : "btn-container"
        }
        onClick={() => this.props.closeMenu()}
      >
        <NavLink to="/">View Notes</NavLink>
        <NavLink to="/add-note">Add Note</NavLink>
        <NavLink to="/">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    );
  }
}
