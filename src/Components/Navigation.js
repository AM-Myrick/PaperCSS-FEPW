import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import "./Navigation.css"


export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
          width: 0
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWidth)
    }

    updateWidth = () => {
        this.setState({ width: window.innerWidth })
    }

    logout = () => {
        localStorage.removeItem("access_token");
    }
    render() {
        return (
            this.state.width >= 1000 ?
                <nav>
                    <h1>Paper Notes</h1>
                    <div className="btn-container">
                        <NavLink to="/">Register</NavLink>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/all-notes">View Your Notes</NavLink>
                        <NavLink to="/add-note">Add New Note</NavLink>
                        <NavLink to="/login" onClick={() => this.logout()}>Logout</NavLink>
                    </div>
                </nav> :
                <nav className="fixed">
                    <h1>Paper Notes</h1>
                    <div class="collapsible">
                        <input id="collapsible1" type="checkbox" name="collapsible1" />
                        <button>
                        <label for="collapsible1">
                            <div class="bar1"></div>
                            <div class="bar2"></div>
                            <div class="bar3"></div>
                        </label>
                        </button>
                        <div className="collapsible-body btn-container">
                            <NavLink to="/">Register</NavLink>
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/all-notes">View Your Notes</NavLink>
                            <NavLink to="/add-note">Add New Note</NavLink>
                            <NavLink to="/login" onClick={() => this.logout()}>Logout</NavLink>
                        </div>
                    </div>
                </nav>
        )
    }
}