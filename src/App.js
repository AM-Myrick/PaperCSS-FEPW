import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import AllNotes from "./Views/AllNotes";
import NewNote from "./Views/NewNote"
import './App.css';
import SingleNoteView from './Views/SingleNoteView';
import UpdateNote from "./Views/UpdateNote";
import axios from "axios";

if (localStorage.getItem("access_token")) {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem("access_token");
}

export default class App extends Component {

  closeMenu = () => {
    const hamburgerMenu = document.querySelector("#collapsible1");
    if (hamburgerMenu && hamburgerMenu.checked) {
      hamburgerMenu.checked = false;
    }
  }

  render() {
    return (
      <div className="App">
        <Route path="/" 
          render={(props) => <Navigation 
            {...props} 
            closeMenu={this.closeMenu} />}
        />
        <Route exact path="/" 
          render={(props) => <AllNotes 
            {...props} 
            closeMenu={this.closeMenu} />}
        />
        <Route exact path="/add-note" 
          render={(props) => <NewNote 
            {...props} 
            closeMenu={this.closeMenu} />}
        />
        <Route path={`/note/:id`} 
          render={(props) => <SingleNoteView 
            {...props} 
            closeMenu={this.closeMenu} />}
        />
        <Route path={`/edit/:id`} 
          render={(props) => <UpdateNote 
            {...props} 
            closeMenu={this.closeMenu} />}
        />
      </div>
    )
  }
}
