import React, { Component } from 'react';
import axios from "axios";
import "./Login.css"

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
                    this.props.history.push('/all-notes');
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
                        type="text" 
                        id="password" 
                        name="password" 
                        className="input"
                        value={this.state.user.password}
                        onChange={this.changeHandler} />
                        <button type="submit">Submit</button>
                </form>
                { this.state.message ?
                    (<h4>{this.state.message}</h4>):
                    undefined}
            </div>
        );
    }
}

export default Login;