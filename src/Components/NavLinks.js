import React from 'react';
import { NavLink } from "react-router-dom";

const NavLinks = props => {
    const token = localStorage.getItem("access_token");
    const logout = () => localStorage.removeItem("access_token");

    return (
        token ?    
        <div className={props.width <= 768 ? "collapsible-body btn-container" : "btn-container"}
            onClick={() => props.closeMenu()}>
            <NavLink to="/">View Notes</NavLink>
            <NavLink to="/add-note">Add Note</NavLink>
            <NavLink to="/login" onClick={() => logout()}>Logout</NavLink>
        </div> :
        <div className={props.width <= 768 ? "collapsible-body btn-container" : "btn-container"}
            onClick={() => props.closeMenu()}>
            <NavLink to="/">View Notes</NavLink>
            <NavLink to="/add-note">Add Note</NavLink>            
            <NavLink to="/">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
        </div>
    )
}

export default NavLinks;