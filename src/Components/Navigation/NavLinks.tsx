import React from "react";
import { NavLink } from "react-router-dom";
import { NavLinksProps } from "../../Models/Props";
import "./NavLinks.scss";

const NavLinks: React.FC<NavLinksProps> = ({
  width,
  closeMenu,
  showRegisterModal,
  showLoginModal
}) => {
  const token = localStorage.getItem("access_token");

  const classNames =
    width <= 768 ? "collapsible-body btn-container" : "btn-container";
    
  const logout = () => {
    const notes = [
      {
        id: "note-1",
        title: "Thanks for using Paper Notes!",
        content: "Come back soon!"
      }
    ];
    localStorage.setItem("paper_notes", JSON.stringify(notes));
    localStorage.removeItem("access_token");
    window.location.replace(window.location.origin);
  };

  if (token) {
    return (
      <div className={classNames} onClick={() => closeMenu()}>
        <NavLink className="nav-button" to="/">View Notes</NavLink>
        <NavLink className="nav-button" to="/add-note">Add Note</NavLink>
        <NavLink className="nav-button" to="/" onClick={() => logout()}>
          Logout
        </NavLink>
      </div>
    );
  }

  return (
    <div className={classNames} onClick={() => closeMenu()}>
      <NavLink className="nav-button" to="/">View Notes</NavLink>
      <NavLink className="nav-button" to="/add-note">Add Note</NavLink>
      <div className="nav-button" onClick={() => showRegisterModal()}>
        Register
      </div>
      <div className="nav-button" onClick={() => showLoginModal()}>
        Login
      </div>
    </div>
  );
};

export default NavLinks;
