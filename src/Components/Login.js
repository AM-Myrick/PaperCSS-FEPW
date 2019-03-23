import React, { Component } from 'react';
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
                        user: {...initialUser}
                    })
<<<<<<< HEAD
                    setInterval(() => this.props.history.push('/all-notes'), 750);
=======
                    setInterval(() => this.props.history.push('/all-notes'), 100);
>>>>>>> d62854e74aea1e1c83a1c25c0f5ed2d3880e8966
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
<<<<<<< HEAD
                        type="text" 
=======
                        type="password" 
>>>>>>> d62854e74aea1e1c83a1c25c0f5ed2d3880e8966
                        id="password" 
                        name="password" 
                        className="input"
                        value={this.state.user.password}
                        onChange={this.changeHandler} />
                        <button type="submit">Login</button>
                </form>
                { this.state.message ?
                    (<h4>{this.state.message}</h4>):
                    undefined}
            </div>
        );
    }
}

export default Login;