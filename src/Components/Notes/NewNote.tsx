import React, { useState, FormEvent, MouseEvent, ChangeEvent } from "react";
import axios from "axios";
import "./NewNote.css";
import { AppProps } from "../../Models/Props";
import Note from "../../Models/Note";
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9001"
    : "https://nameless-cliffs-24621.herokuapp.com";

const NewNote: React.FC<AppProps> = ({ closeMenu, history }) => {
  const [note, setNote] = useState<Note>({ title: "", content: "" });

  const addNote = (
    e: MouseEvent<HTMLButtonElement, MouseEvent> | FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (token) {
      addNoteToServer();
    } else {
      addLocalNote();
    }
  };

  const addLocalNote = () => {
    const notes: Note[] =
      JSON.parse(localStorage.getItem("paper_notes")!) || [];
    const { title, content } = note;
    const newNote = { id: `note-${notes.length + 1}`, title, content };
    notes.push(newNote);
    localStorage.setItem("paper_notes", JSON.stringify(notes));
    history.push("/");
  };

  const addNoteToServer = () => {
    axios
      .post("/api/notes/", note)
      .then(() => history.push("/"))
      .catch(error => console.log(error));
  };

  const changeHandler = (
    e: FormEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setNote({ ...note, [name]: value });
  };

  return (
    <section className="new-note" onClick={closeMenu}>
      <h2>Create New Note:</h2>
      <form onSubmit={addNote}>
        <input
          onChange={changeHandler}
          type="text"
          placeholder="Note Title"
          name="title"
          value={note.title}
          className="new-title"
        />
        <textarea
          onChange={changeHandler}
          placeholder="Note Content"
          name="content"
          value={note.content}
          className="new-textBody"
        ></textarea>
        <button className="default save" type="submit">
          Save
        </button>
      </form>
    </section>
  );
};

export default NewNote;
