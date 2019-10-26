import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SingleNoteView.css";

export default class SingleNoteView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: 0,
      noteIndex: "",
      delete: false
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const token = localStorage.getItem("access_token");
    let notes = JSON.parse(localStorage.getItem("paper_notes"));
    if (notes !== null) {
      let note = notes.filter((note, noteIndex) => {
        this.setState({ noteIndex });
        return id === note.id;
      });
      note = note[0] === undefined ? null : note[0];
      this.fetchNote(id, token, note);
    } else {
      this.fetchNote(id, token, null);
    }
  }

  fetchNote = (id, token, note) => {
    if (token) {
      axios
        .get(`https://nameless-cliffs-24621.herokuapp.com/api/notes/${id}`)
        .then(res => {
          this.setState({ note: res.data });
          return;
        })
        .catch(err => console.log(err));
    } else if (note === null) {
      //   TODO
    } else {
      this.setState({
        note: { id: note.id, title: note.title, content: note.content }
      });
    }
  };

  deleteToggle = e => {
    e.preventDefault();
    this.props.closeMenu();
    this.setState({ delete: !this.state.delete });
  };

  deleteNote = (e, token) => {
    e.preventDefault();
    if (token) {
      axios
        .delete(
          `https://nameless-cliffs-24621.herokuapp.com/api/notes/${this.state.note.id}`
        )
        .then(res => this.props.history.push("/"))
        .catch(err => console.log(err));
    } else {
      let notes = JSON.parse(localStorage.getItem("paper_notes"));
      notes = notes.filter((_, index) => index !== this.state.noteIndex);
      localStorage.setItem("paper_notes", JSON.stringify(notes));
      this.props.history.push("/")
    }
  };

  render() {
    return this.state.note === 0 ? (
      <div className="single-note">
        <p>Loading...</p>
      </div>
    ) : this.state.delete ? (
      <div className="single-note" onClick={e => this.deleteToggle(e)}>
        <div className="link-wrapper">
          <Link to={`/edit/${this.state.note.id}`}>edit</Link>
          <p onClick={this.deleteToggle}>delete</p>
        </div>
        <h3>{this.state.note.title}</h3>
        <p>{this.state.note.content}</p>
        <div className="delete-modal">
          <div className="delete-menu">
            <p>Are you sure you want to delete this note?</p>
            <div className="cancel" onClick={this.deleteToggle}>
              Cancel
            </div>
            <div
              className="delete"
              onClick={e =>
                this.deleteNote(
                  e,
                  localStorage.getItem("access_token")
                )
              }
            >
              Delete
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="single-note" onClick={() => this.props.closeMenu()}>
        <div className="link-wrapper">
          <Link to={`/edit/${this.state.note.id}`}>edit</Link>
          <p onClick={e => this.deleteToggle(e)}>delete</p>
        </div>
        <h3>{this.state.note.title}</h3>
        <p>{this.state.note.content}</p>
      </div>
    );
  }
}
