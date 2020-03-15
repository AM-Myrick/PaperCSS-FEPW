import React, { useState, useEffect, MouseEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import "../../Styles/SingleNoteView.scss";
import { AppProps } from "../../Models/Props";
import Note from "../../Models/Note";
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
      // should be altered with app state
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

  if (showDeleteModal) {
    return (
      <DeleteModal
        history={history}
        note={note}
        deleteToggle={deleteToggle}
        noteIndex={noteIndex}
      />
    );
  }

  if (note.title || note.content) {
    return (
      <section className="single-note" onClick={() => closeMenu()}>
        <div className="link-wrapper">
          <Link to={`/edit/${note.id}`}>edit</Link>
          <p onClick={deleteToggle}>delete</p>
        </div>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
      </section>
    );
  }

  return (
    <section className="single-note">
      <p>Loading...</p>
    </section>
  );
};

export default SingleNoteView;
