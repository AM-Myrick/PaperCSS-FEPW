import React, { Component } from "react";
import axios from "axios";
import "./NewNote.css";

export default class NewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };
  }

  addNote = e => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (token) {
      axios
        .post("/api/notes/", this.state)
        .then(res => this.props.history.push("/"))
        .catch(error => console.log(error));
    } else {
      const notes = JSON.parse(localStorage.getItem("paper_notes"));
      const { title, content } = this.state;
      const newNote = { id: `note-${notes.length + 1}`, title, content };
      notes.push(newNote);
      localStorage.setItem("paper_notes", JSON.stringify(notes));
      this.props.history.push("/");
    }
  };

  changeHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <section className="new-note" onClick={() => this.props.closeMenu()}>
        <h2>Create New Note:</h2>
        <form onSubmit={this.addNote}>
          <input
            onChange={this.changeHandler}
            type="text"
            placeholder="Note Title"
            name="title"
            value={this.state.title}
            className="new-title"
          ></input>
          <textarea
            onChange={this.changeHandler}
            type="text"
            placeholder="Note Content"
            name="content"
            value={this.state.content}
            className="new-textBody"
          ></textarea>
          <button className="default save" type="submit">
            Save
          </button>
        </form>
      </section>
    );
  }
}
