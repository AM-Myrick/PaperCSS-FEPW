import React, { Component } from "react";
import axios from "axios";
axios.defaults.baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:9001"
      : "https://nameless-cliffs-24621.herokuapp.com";

export default class UpdateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      id: "",
      noteIndex: ""
    };
  }

  updateNote = e => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (token) {
      axios
        .put(`/api/notes/${this.state.id}`, this.state)
        .then(res => {
          this.props.history.push(`/note/${this.state.id}`);
        })
        .catch(error => console.log(error));
    } else {
      const { id, title, content } = this.state;
      let notes = JSON.parse(localStorage.getItem("paper_notes"));
      notes[this.state.noteIndex] = { id, title, content };
      localStorage.setItem("paper_notes", JSON.stringify(notes));
      this.props.history.push(`/note/${this.state.id}`);
    }
  };

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
      this.selectNote(id, token, note);
    } else {
      this.selectNote(id, token, null);
    }
  }

  selectNote = (id, token, note) => {
    if (token) {
      axios
        .get(`/api/notes/${id}`)
        .then(res =>
          this.setState({
            title: res.data.title,
            content: res.data.content,
            id: res.data.id
          })
        )
        .catch(err => console.log(err));
    } else {
      const { id, title, content } = note;
      this.setState({ id, title, content });
    }
  };

  changeHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <section className="new-note" onClick={() => this.props.closeMenu()}>
        <h2>Edit Note:</h2>
        <form onSubmit={e => this.updateNote(e)}>
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
            Save Edits
          </button>
        </form>
      </section>
    );
  }
}
