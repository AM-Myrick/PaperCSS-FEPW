import React from 'react';
import { NavLink } from "react-router-dom";

const NavLinks = props => {
    let token = localStorage.getItem("access_token") || null;

    const logout = () => {
        localStorage.removeItem("access_token");
    }

    return (
        token === null ?    
        <div className={props.width <= 768 ? "collapsible-body btn-container" : "btn-container"}>
            <NavLink to="/">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
        </div> :
        <div className={props.width <= 768 ? "collapsible-body btn-container" : "btn-container"}>
            <NavLink to="/all-notes">View Notes</NavLink>
            <NavLink to="/add-note">Add Note</NavLink>
            <NavLink to="/login" onClick={() => logout()}>Logout</NavLink>
        </div>
    )
}

export default NavLinks;