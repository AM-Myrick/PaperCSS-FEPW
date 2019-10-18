import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import AllNotes from "./Views/AllNotes";
import NewNote from "./Views/NewNote"
import './App.css';
import SingleNoteView from './Views/SingleNoteView';
import UpdateNote from "./Views/UpdateNote";
import Register from "./Views/Register";
import Login from "./Views/Login";
import axios from "axios";

if (localStorage.getItem("access_token")) {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem("access_token");
}

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Navigation} />
        <Route exact path="/" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/all-notes" component={AllNotes} />
        <Route exact path="/add-note" component={NewNote} />
        <Route path={`/note/:id`} component={SingleNoteView} />
        <Route path={`/edit/:id`} component={UpdateNote} />
      </div>
    )
  }
}
