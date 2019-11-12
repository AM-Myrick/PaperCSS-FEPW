import React, { Component } from "react";
import NoteCard from "../Components/NoteCard";
import "./AllNotes.css";
import { CSVLink } from "react-csv";
import axios from "axios";
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9001"
    : "https://nameless-cliffs-24621.herokuapp.com";

class AllNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: "",
      selected: 0
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("access_token");
    const notes = localStorage.getItem("paper_notes");
    this.getNotes(token, notes);
  }

  getNotes = (token, notes) => {
    if (token === null && notes === null) {
      const content = `
How to use this site:

If you create notes without being logged in, they'll be saved to local storage.

If you create an account while you have notes in local storage, they'll be saved to your new account and removed from local storage.

Thanks for checking out my project! 

If you're interested in seeing more or contacting me, go to https://youwontregrethiring.me.`.trim();
      const notes = [
        { id: "note-1", title: "Welcome to Paper Notes!", content }
      ];

      localStorage.setItem("paper_notes", JSON.stringify(notes));
      this.setState({ notes });
    } else if (token) {
      axios
        .get(`/api/notes`)
        .then(res => {
          this.setState({ notes: res.data });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      notes = JSON.parse(notes);
      const counter = {};

      for (let note of notes) {
        if (counter[note.id]) {
          counter[note.id]++;
          continue;
        }
        counter[note.id] = 1;
      }

      notes = notes.map(note => {
        while (counter[note.id] > 1) {
          const newNoteId = parseInt(note.id[note.id.length - 1]);
          counter[note.id]--;
          note.id = `note-${newNoteId + 1}`;
          if (counter[note.id]) {
            counter[note.id]++;
            continue;
          }
          counter[note.id] = 1;
        }
        return note;
      });

      localStorage.setItem("paper_notes", JSON.stringify(notes));
      this.setState({ notes });
    }
  };

  selectNote = id => this.setState({ selected: id });

  sortNotes = (e, alphaSort) => {
    e.preventDefault();
    alphaSort === true
      ? this.setState({
          notes: this.state.notes.sort(function(a, b) {
            let titleA = a.title.toLowerCase();
            let titleB = b.title.toLowerCase();
            if (titleA < titleB) {
              return -1;
            }
            if (titleA > titleB) {
              return 1;
            }
            return 0;
          })
        })
      : this.setState({
          notes: this.state.notes.sort(function(b, a) {
            let titleA = a.title.toLowerCase();
            let titleB = b.title.toLowerCase();
            if (titleA < titleB) {
              return -1;
            }
            if (titleA > titleB) {
              return 1;
            }
            return 0;
          })
        });
  };

  headers = [
    { label: "Title", key: "title" },
    { label: "Note Content", key: "content" }
  ];

  render() {
    return this.state.notes ? (
      <section onClick={() => this.props.closeMenu()}>
        <div className="btn-container">
          <CSVLink
            download="mynotes.csv"
            data={this.state.notes}
            headers={this.headers}
          >
            Download your notes!
          </CSVLink>
          <div className="dropdown">
            <button className="dropbtn">Sort Options</button>
            <div className="dropdown-content">
              <div onClick={e => this.sortNotes(e, true)}>A-Z</div>
              <div onClick={e => this.sortNotes(e, false)}>Z-A</div>
            </div>
          </div>
        </div>
        <h2>Your Notes:</h2>
        <div className="notes">
          {this.state.notes.map(note => {
            return <NoteCard key={note.id} note={note} />;
          })}
        </div>
      </section>
    ) : (
      <h3 className="loading-message">Your Notes are loading...</h3>
    );
  }
}

export default AllNotes;
