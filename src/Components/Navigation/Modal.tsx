import React, { useState, FormEvent, MouseEvent } from "react";
import axios from "axios";
import "../../Styles/Modal.scss";
import { ModalProps } from "../../Models/Props";
import Note from "../../Models/Note";
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9001"
    : "https://nameless-cliffs-24621.herokuapp.com";


interface User {
  username: string;
  password: string;
}

const Modal: React.FC<ModalProps> = ({
  showModal,
  modalVersion,
  closeMenu
}) => {
  const initialUser: User = {
    username: "",
    password: ""
  };
  const [user, setUser] = useState<User>(initialUser);
  // TODO should be app state
  const [message, setMessage] = useState("Thanks for using Paper Notes!");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const buttonValue = modalVersion === "login" ? "Login" : "Register";

  const submitHandler = (
    e: MouseEvent<HTMLButtonElement, MouseEvent> | FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const notes: Note[] =
      JSON.parse(localStorage.getItem("paper_notes")!) || [];
    modalVersion === "login" ? loginHandler(notes) : registerHandler(notes);
  };

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUser({ ...user, [name]: value });
  };

  const loginHandler = (notes: Note[]) => {
    axios
      .post(`/api/login`, { creds: user, notes })
      .then(res => {
        if (res.status === 200 && res.data) {
          localStorage.removeItem("paper_notes");
          localStorage.setItem("access_token", res.data.token);
          axios.defaults.headers.common["Authorization"] = res.data.token;
          setMessage("Login successful");
          setUser(initialUser);
          setLoggedIn(true);
          setNotes(res.data.notes);
          if (window.location.pathname !== "/") {
            window.location.replace(window.location.origin);
          } else {
            window.location.reload();
          }
        } else {
          throw new Error();
        }
      })
      .catch(err => setMessage("Login failed"));
  };

  const registerHandler = (notes: Note[]) => {
    axios
      .post(`/api/register`, { creds: user })
      .then(res => {
        if (res.data) {
          setMessage("Registration successful, please wait");
          closeMenu();
          loginHandler(notes);
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        setMessage("Registration failed");
        setUser(initialUser);
      });
  };

  if (showModal) {
    return (
      <div className="card card-modal">
        <div className="card-body">
          <h3 className="card-title">{message}</h3>
          <form onSubmit={submitHandler}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              className="input"
              value={user.username}
              onChange={changeHandler}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="input"
              value={user.password}
              onChange={changeHandler}
            />
            <button type="submit">{buttonValue}</button>
          </form>
        </div>
      </div>
    );
  }

  return null;
};

export default Modal;
