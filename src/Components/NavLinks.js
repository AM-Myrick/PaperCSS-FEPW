import React from "react";
import { NavLink } from "react-router-dom";

const token = localStorage.getItem("access_token");
export default class NavLinks extends React.Component {
  
  logout = () => {
    const notes = [
      { id: "note-1", title: "Thanks for using Paper Notes!", content: "Come back soon!" }
    ];
    localStorage.setItem("paper_notes", JSON.stringify(notes))
    localStorage.removeItem("access_token")
    window.location.reload();
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
        <NavLink to="/" onClick={() => this.logout()}>
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
        <div className="nav-button" onClick={() => this.props.showRegisterModal()}>Register</div>
        <div className="nav-button" onClick={() => this.props.showLoginModal()}>Login</div>
      </div>
    );
  }
}
