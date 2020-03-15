import React, { MouseEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../Styles/DeleteModal.scss";
import { DeleteModalProps } from "../../Models/Props";
import Note from "../../Models/Note";
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9001"
    : "https://nameless-cliffs-24621.herokuapp.com";

const DeleteModal: React.FC<DeleteModalProps> = ({
  history,
  note,
  deleteToggle,
  noteIndex
}) => {
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

  return (
    <section className="single-note" onClick={deleteToggle}>
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
    </section>
  );
};

export default DeleteModal;
