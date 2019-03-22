import React from 'react';
import { NavLink } from "react-router-dom";
import "./Navigation.css"

const Navigation = props => {
    return (
        localStorage.getItem("access_token") ?
        <nav>
            <h1>Lambda Notes</h1>
            <div className="btn-container">
                <NavLink to="/all-notes">View Your Notes</NavLink>
                <NavLink to="/add-note">+ Create New Note</NavLink>
                <NavLink to="/login" onClick={() => localStorage.removeItem("access_token")}>Logout</NavLink>
            </div>
        </nav> :
        <nav>
            <h1>Lambda Notes</h1>
            <div className="btn-container">
                <NavLink to="/">Join Lambda Notes!</NavLink>
                <NavLink to="/login">Login to Lambda Notes!</NavLink>
            </div>
        </nav>
    )
}

export default Navigation;