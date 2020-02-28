import Note from "../Models/Note";


export interface NoteState {
    notes: Note[];
    selectedNote: string | number;
    title: string;
    content: string;
    currentNote: Note | null;
    noteIndex: number;
    openDeleteModal: boolean;
  }
  
  export const initialNoteState: NoteState = {
    notes: [],
    selectedNote: "",
    title: "",
    content: "",
    currentNote: null,
    noteIndex: 0,
    openDeleteModal: false
  };