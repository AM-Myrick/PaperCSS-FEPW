import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Modal.css";

const initialUser = {
  username: "",
  password: ""
};

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { ...initialUser },
      message: "Thanks for using Paper Notes!",
      loggedIn: false,
      notes: ""
    };
  }

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ user: { ...this.state.user, [name]: value } });
  };

  loginHandler = e => {
    e.preventDefault();
    const notes = JSON.parse(localStorage.getItem("paper_notes")) || [];
    axios
      .post(`/api/login`, { creds: this.state.user, notes })
      .then(res => {
        if (res.status === 200 && res.data) {
          localStorage.removeItem("paper_notes");
          localStorage.setItem("access_token", res.data.token);
          axios.defaults.headers.common["Authorization"] = res.data.token;
          this.setState({
            message: "Login successful",
            user: { ...initialUser },
            notes: res.data.notes,
            loggedIn: true
          });
          if (window.location.pathname !== "/") {
            window.location.replace(window.location.origin);
          } else {
            window.location.reload();
          }
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        this.setState({
          ...this.state,
          message: "Login failed"
        });
      });
  };

  registerHandler = e => {
    e.preventDefault();
    const notes = JSON.parse(localStorage.getItem("paper_notes")) || [];
    axios
      .post(`/api/register`, { creds: this.state.user, notes })
      .then(res => {
        if (res.data) {
          this.setState({
            message: "Registration successful",
            user: { ...initialUser }
          });
          this.props.showLoginModal();
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        this.setState({
          message: "Registration failed",
          user: { ...initialUser }
        });
      });
  };

  render() {
    return this.props.show ? (
      <div className="card card-modal">
        <div className="card-body">
          <h3 className="card-title">{this.state.message}</h3>
          <form onSubmit={this.submitHandler}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              className="input"
              value={this.state.user.username}
              onChange={this.changeHandler}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="input"
              value={this.state.user.password}
              onChange={this.changeHandler}
            />
            {this.props.view === "login" ? (
              <Link to="/">
                <button onClick={e => this.loginHandler(e)} type="submit">
                  Login
                </button>
              </Link>
            ) : (
              <Link to="/">
                <button onClick={e => this.registerHandler(e)} type="submit">
                  Register
                </button>
              </Link>
            )}
          </form>
        </div>
      </div>
    ) : null;
  }
}
