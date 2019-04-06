import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import "./Navigation.css"


export default class Navigation extends Component {
    logout = () => {
        localStorage.removeItem("access_token");
    }
    render() {
        return (
            <nav>
                <h1>Paper Notes</h1>
                <div className="btn-container">
                    <NavLink to="/">Register</NavLink>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/all-notes">View Your Notes</NavLink>
                    <NavLink to="/add-note">Add New Note</NavLink>
                    <NavLink to="/login" onClick={() => this.logout()}>Logout</NavLink>
                </div>
            </nav>
        )
    }
}