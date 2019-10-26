import React from 'react';
import { NavLink } from "react-router-dom";

const NavLinks = props => {
    const token = localStorage.getItem("access_token");
    const notes = localStorage.getItem("paper_notes");
    const logout = () => localStorage.removeItem("access_token")

    return (
        token === null && notes === null ?    
        <div className={props.width <= 768 ? "collapsible-body btn-container" : "btn-container"}
            onClick={() => props.closeMenu()}>
            <NavLink className="sign-in" to="/">Register</NavLink>
            <NavLink className="sign-in" to="/login">Login</NavLink>
        </div> :
        <div className={props.width <= 768 ? "collapsible-body btn-container" : "btn-container"}
            onClick={() => props.closeMenu()}>
            <NavLink to="/">View Notes</NavLink>
            <NavLink to="/add-note">Add Note</NavLink>
            <NavLink to="/login" onClick={() => logout()}>Logout</NavLink>
        </div>
    )
}

export default NavLinks;