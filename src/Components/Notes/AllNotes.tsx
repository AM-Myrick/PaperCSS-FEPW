import React, { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import "../../Styles/AllNotes.scss";
import { CSVLink } from "react-csv";
import axios from "axios";
import Note from "../../Models/Note";
import { AppProps } from "../../Models/Props";
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9001"
    : "https://nameless-cliffs-24621.herokuapp.com";

const AllNotes: React.FC<AppProps> = ({ closeMenu }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const notes = localStorage.getItem("paper_notes");
    if (token === null && notes === null) {
      createLocalNotes();
    } else if (token) {
      getUserNotes();
    } else {
      parseLocalNotes(notes!);
    }
  }, []);

  const createLocalNotes = () => {
    const content = `
    How to use this site:

    If you create notes without being logged in, they'll be saved to local storage.

    If you create an account while you have notes in local storage, they'll be saved to your new account and removed from local storage.

    Thanks for checking out my project! 

    If you're interested in seeing more or contacting me, go to https://youwontregrethiring.me.`.trim();
    const notes: Note[] = [
      { id: "note-1", title: "Welcome to Paper Notes!", content }
    ];

    localStorage.setItem("paper_notes", JSON.stringify(notes));
    setNotes(notes);
  };

  const getUserNotes = () => {
    axios
      .get(`/api/notes`)
      .then(res => {
        setNotes(res.data);
      })
      .catch(error => {
        if (error["name"] === "TokenExpiredError") {
          // TODO: add logout logic
        }
        console.log(error);
      });
  };

  const parseLocalNotes = (stringNotes: string) => {
    interface Counter {
      [key: string]: number;
    }
    let notes: Note[] = JSON.parse(stringNotes);
    const counter: Counter = {};

    for (const note of notes) {
      if (counter[note.id!]) {
        counter[note.id!]++;
        continue;
      }
      counter[note.id!] = 1;
    }

    notes = notes.map(note => {
      while (counter[note.id!] > 1) {
        const noteId = note.id as string;
        const newNoteId = parseInt(noteId[noteId.length - 1]);
        counter[note.id!]--;
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
    setNotes(notes);
  };

  const sortNotes = (e: any, alphaSort: boolean) => {
    e.preventDefault();
    alphaSort === true
      ? setNotes([
          ...notes.sort(function(a, b) {
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
        ])
      : setNotes([
          ...notes.sort(function(b, a) {
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
        ]);
  };

  const headers = [
    { label: "Title", key: "title" },
    { label: "Note Content", key: "content" }
  ];

  if (notes) {
    return (
      <section onClick={() => closeMenu()}>
        <div className="btn-container">
          <CSVLink download="mynotes.csv" data={notes} headers={headers}>
            Download your notes!
          </CSVLink>
          <div className="dropdown">
            <div className="dropbtn">Sort Options</div>
            <div className="dropdown-content">
              <div onClick={e => sortNotes(e, true)}>A-Z</div>
              <div onClick={e => sortNotes(e, false)}>Z-A</div>
            </div>
          </div>
        </div>
        <h2>Your Notes:</h2>
        <div className="notes">
          {notes.map(note => {
            return <NoteCard key={note.id} note={note} />;
          })}
        </div>
      </section>
    );
  }

  return <h3 className="loading-message">Your Notes are loading...</h3>;
};

export default AllNotes;
