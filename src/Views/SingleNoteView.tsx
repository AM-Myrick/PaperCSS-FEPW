import React, { useState, useEffect, MouseEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SingleNoteView.css";
import { AppProps } from "../Models/Props";
import Note from "../Models/Note";
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9001"
    : "https://nameless-cliffs-24621.herokuapp.com";

const SingleNoteView: React.FC<AppProps> = ({ match, history, closeMenu }) => {
  const [noteIndex, setNoteIndex] = useState<number>();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  // TODO should be deprecated with app state
  const [note, setNote] = useState<Note>({ title: "", content: "" });

  useEffect(() => {
    const { id } = match.params;
    const token = localStorage.getItem("access_token");
    const notes = JSON.parse(localStorage.getItem("paper_notes")!);
    if (notes !== null) {
      const note: Note[] = notes.filter((note: Note, noteIndex: number) => {
        if (id === note.id) {
          setNoteIndex(noteIndex);
        }
        return id === note.id;
      });
      const selectedNote = note[0] === undefined ? null : note[0];
      fetchNote(id!, token, selectedNote);
    } else {
      fetchNote(id!, token, null);
    }
  }, [match.params]);

  const fetchNote = (id: string, token: string | null, note: Note | null) => {
    if (token) {
      axios
        .get(`/api/notes/${id}`)
        .then(res => {
          setNote(res.data);
          return;
        })
        .catch(err => console.log(err));
    } else if (note === null) {
      //   TODO implement "no note found" page
    } else {
      setNote({ id: note.id, title: note.title, content: note.content });
    }
  };

  const deleteToggle = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    closeMenu();
    setShowDeleteModal(!showDeleteModal);
  };

  const deleteNote = (e: MouseEvent<HTMLDivElement>, token: string | null) => {
    e.preventDefault();
    if (token) {
      axios
        .delete(`/api/notes/${note.id}`)
        .then(() => history.push("/"))
        .catch(err => console.log(err));
    } else {
      let notes = JSON.parse(localStorage.getItem("paper_notes")!);
      notes = notes.filter((_: Note, index: number) => index !== noteIndex);
      localStorage.setItem("paper_notes", JSON.stringify(notes));
      history.push("/");
    }
  };

  if (showDeleteModal) {
    return (
      <div className="single-note" onClick={deleteToggle}>
        <div className="link-wrapper">
          <Link to={`/edit/${note.id}`}>edit</Link>
          <p onClick={deleteToggle}>delete</p>
        </div>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        <div className="delete-modal">
          <div className="delete-menu">
            <p>Are you sure you want to delete this note?</p>
            <div className="cancel" onClick={deleteToggle}>
              Cancel
            </div>
            <div
              className="delete"
              onClick={e => deleteNote(e, localStorage.getItem("access_token"))}
            >
              Delete
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (note.title || note.content) {
    return (
      <div className="single-note" onClick={() => closeMenu()}>
        <div className="link-wrapper">
          <Link to={`/edit/${note.id}`}>edit</Link>
          <p onClick={deleteToggle}>delete</p>
        </div>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
      </div>
    );
  }

  return (
    <div className="single-note">
      <p>Loading...</p>
    </div>
  );
};

export default SingleNoteView;
