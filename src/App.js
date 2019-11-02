import React, { Component } from "react";
import { Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import AllNotes from "./Views/AllNotes";
import NewNote from "./Views/NewNote";
import "./App.css";
import SingleNoteView from "./Views/SingleNoteView";
import UpdateNote from "./Views/UpdateNote";
import axios from "axios";
import Modal from "./Views/Modal";

if (localStorage.getItem("access_token")) {
  axios.defaults.headers.common["Authorization"] = localStorage.getItem(
    "access_token"
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showModalVersion: ""
    };
  }

  closeMenu = () => {
    const hamburgerMenu = document.querySelector("#collapsible1");
    if (hamburgerMenu && hamburgerMenu.checked) {
      hamburgerMenu.checked = false;
    }
    if (this.state.showModal === true) {
      this.setState({ showModal: !this.state.showModal });
    }
  };

  showRegisterModal = () => {
    this.setState({ showModal: true, showModalVersion: "register" });
  };

  showLoginModal = () => {
    this.setState({ showModal: true, showModalVersion: "login" });
  };

  render() {
    return (
      <div className="App">
        <Route
          path="/"
          render={props => (
            <Navigation
              {...props}
              closeMenu={this.closeMenu}
              showRegisterModal={this.showRegisterModal}
              showLoginModal={this.showLoginModal}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={props => <AllNotes {...props} closeMenu={this.closeMenu} />}
        />
        <Route
          exact
          path="/add-note"
          render={props => <NewNote {...props} closeMenu={this.closeMenu} />}
        />
        <Route
          path={`/note/:id`}
          render={props => (
            <SingleNoteView {...props} closeMenu={this.closeMenu} />
          )}
        />
        <Route
          path={`/edit/:id`}
          render={props => <UpdateNote {...props} closeMenu={this.closeMenu} />}
        />
        <Modal
          show={this.state.showModal}
          view={this.state.showModalVersion}
          closeMenu={this.closeMenu}
          showLoginModal={this.showLoginModal}
        />
      </div>
    );
  }
}
