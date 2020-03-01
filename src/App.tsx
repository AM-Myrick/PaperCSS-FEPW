import React, { useState } from "react";
import { Route } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";
import AllNotes from "./Views/AllNotes";
import NewNote from "./Views/NewNote";
import "./App.css";
import SingleNoteView from "./Views/SingleNoteView";
import UpdateNote from "./Views/UpdateNote";
import axios from "axios";
import Modal from "./Components/Navigation/Modal";
import { RouteComponentProps } from "react-router";
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9001"
    : "https://nameless-cliffs-24621.herokuapp.com";

if (localStorage.getItem("access_token")) {
  axios.defaults.headers.common["Authorization"] = localStorage.getItem(
    "access_token"
  );
}

const App: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalVersion, setModalVersion] = useState<string>("");

  const closeMenu = () => {
    const hamburgerMenu: HTMLInputElement | null = document.querySelector(
      "#collapsible1"
    );
    if (hamburgerMenu?.checked) {
      hamburgerMenu.checked = false;
    }
    if (showModal === true) {
      setShowModal(!showModal);
    }
  };

  const showRegisterModal = () => {
    setShowModal(true);
    setModalVersion("register");
  };

  const showLoginModal = () => {
    setShowModal(true);
    setModalVersion("login");
  };

  return (
    <div className="App">
      <Route
        path="/"
        render={(props: RouteComponentProps) => (
          <Navigation
            {...props}
            closeMenu={closeMenu}
            showRegisterModal={showRegisterModal}
            showLoginModal={showLoginModal}
          />
        )}
      />
      <Route
        exact
        path="/"
        render={(props: RouteComponentProps) => <AllNotes {...props} closeMenu={closeMenu} />}
      />
      <Route
        exact
        path="/add-note"
        render={(props: RouteComponentProps) => <NewNote {...props} closeMenu={closeMenu} />}
      />
      <Route
        path={`/note/:id`}
        render={(props: RouteComponentProps) => (
          <SingleNoteView {...props} closeMenu={closeMenu} />
        )}
      />
      <Route
        path={`/edit/:id`}
        render={(props: RouteComponentProps) => <UpdateNote {...props} closeMenu={closeMenu} />}
      />
      <Modal
        show={showModal}
        view={modalVersion}
        closeMenu={closeMenu}
        showLoginModal={showLoginModal}
      />
    </div>
  );
};

export default App;
