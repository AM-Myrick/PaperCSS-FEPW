import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Navigation from "./Views/Navigation";
import AllNotes from "./Views/AllNotes";
import NewNote from "./Components/NewNote"
import './App.css';
import SingleNoteView from './Views/SingleNoteView';
import UpdateNote from "./Components/UpdateNote";
import Register from "./Components/Register";
import Login from "./Components/Login";

export default class App extends Component {
  constructor(props) {
    super(props)
  }
  
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
