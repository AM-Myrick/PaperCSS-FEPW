import React, {
  useState,
  MouseEvent,
  FormEvent,
  useEffect,
  ChangeEvent
} from "react";
import axios from "axios";
import { AppProps } from "../../Models/Props";
import Note from "../../Models/Note";
import NotePreview from "./NotePreview";
import "../../Styles/NewNote.scss";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9001"
    : "https://nameless-cliffs-24621.herokuapp.com";

const UpdateNote: React.FC<AppProps> = ({ match, history, closeMenu }) => {
  const [noteIndex, setNoteIndex] = useState<number>();
  const [showPreview, setShowPreview] = useState<boolean>(false);
  // TODO should be deprecated with app state
  const [note, setNote] = useState<Note>({ title: "", content: "" });

  const updateNote = (
    e: MouseEvent<HTMLButtonElement, MouseEvent> | FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (token) {
      axios
        .put(`/api/notes/${note.id}`, note)
        .then(() => {
          history.push(`/note/${note.id}`);
        })
        .catch(error => console.log(error));
    } else {
      const { id, title, content } = note;
      const notes = JSON.parse(localStorage.getItem("paper_notes")!);
      notes[noteIndex!] = { id, title, content };
      localStorage.setItem("paper_notes", JSON.stringify(notes));
      history.push(`/note/${note.id}`);
    }
  };

  useEffect(() => {
    const { id } = match.params;
    const token: string | null = localStorage.getItem("access_token");
    const notes = JSON.parse(localStorage.getItem("paper_notes")!);
    if (notes !== null) {
      const note: Note[] = notes.filter((note: Note, noteIndex: number) => {
        if (id === note.id) {
          setNoteIndex(noteIndex);
        }
        return id === note.id;
      });
      const selectedNote = note[0] === undefined ? null : note[0];
      selectNote(id!, token, selectedNote);
    } else {
      selectNote(id!, token, null);
    }
  }, [match.params]);

  const selectNote = (
    id: string | number,
    token: string | null,
    note: Note | null
  ) => {
    if (token) {
      axios
        .get(`/api/notes/${id}`)
        .then(res => {
          const { title, content, id } = res.data;
          setNote({ title, content, id });
        })
        .catch(err => console.log(err));
    } else {
      const { id, title, content } = note!;
      setNote({ id, title, content });
    }
  };

  const previewHandler = () => {
    setShowPreview(!showPreview);
  }

  const changeHandler = (
    e: FormEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setNote({ ...note, [name]: value });
  };

  if (showPreview) {
    return ( <NotePreview
      note={note}
      closeMenu={closeMenu}
      updateNote={updateNote}
      previewHandler={previewHandler}
    />
    )
  }

  return (
    <section className="new-note" onClick={closeMenu}>
      <h2>Edit Note:</h2>
      <form onSubmit={updateNote}>
        <input
          onChange={changeHandler}
          type="text"
          placeholder="Note Title"
          name="title"
          value={note.title}
          className="new-title"
        ></input>
        <textarea
          onChange={changeHandler}
          placeholder="Note Content"
          name="content"
          value={note.content}
          className="new-textBody"
        ></textarea>
        <button className="default save" type="submit">
          Save Edits
        </button>
        <button className="default save" type="button" onClick={previewHandler}>
          Show Preview
        </button>
      </form>
    </section>
  );
};

export default UpdateNote;
