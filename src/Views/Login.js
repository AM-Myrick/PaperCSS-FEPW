import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const URL = "https://nameless-cliffs-24621.herokuapp.com";

const initialUser = {
    username: "",
    password: "",
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { ...initialUser },
            message: "",
            loggedIn: false,
            notes: "",
        }
    }

    changeHandler = (e) => {
        const { name, value } = e.target;
        this.setState({ user: { ...this.state.user, [name]: value }})
    }

    submitHandler = (e) => {
        e.preventDefault();
        axios.post(`${URL}/api/login`, this.state.user)
            .then(res => {
                if (res.status === 200 && res.data) {
                    localStorage.setItem("access_token", res.data.token);
                    this.setState({
                        message: "Login successful",
                        user: {...initialUser},
                        notes: res.data.notes,
                        loggedIn: true
                    })
                    this.props.history.push({
                        pathname: "/all-notes",
                        state: this.state,    
                    })
                } else {
                    throw new Error();
                }
            })
            .catch(err => {
                this.setState({
                    message: "Login failed",
                    user: {...initialUser}
                })
            });
    }
    
    render() {
        return (
            <div className="login">
                <h3>Please Login</h3>
                <form onSubmit={this.submitHandler}>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        className="input"
                        value={this.state.user.username}
                        onChange={this.changeHandler} />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password" 
                        id="password" 
                        name="password" 
                        className="input"
                        value={this.state.user.password}
                        onChange={this.changeHandler} />
                        <Link to="/all-notes">
                            <button onClick={this.submitHandler}type="submit">Login</button>
                        </Link>
                </form>
                { this.state.message ?
                    (<h4>{this.state.message}</h4>):
                    undefined}
            </div>
        );
    }
}

export default Login;