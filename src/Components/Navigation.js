import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import "./Navigation.css"


export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
          width: window.innerWidth
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
                    <div className="collapsible">
                        <input id="collapsible1" type="checkbox" name="collapsible1" />
                        <button>
                        <label htmlFor="collapsible1">
                            <div className="bar1"></div>
                            <div className="bar2"></div>
                            <div className="bar3"></div>
                        </label>
                        </button>
                        <div className={this.state.width <= 768 ? "collapsible-body btn-container" : "btn-container"}>
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