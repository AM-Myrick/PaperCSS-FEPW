import Note from "../Models/Note";

export interface AppState {
    notes: Note[];
    selectedNote: string | number;
    title: string;
    content: string;
    currentNote: Note | null;
    noteIndex: number;
    openDeleteModal: boolean;
    loggedIn: boolean;
  }
  
  export const initialAppState: AppState = {
    notes: [],
    selectedNote: "",
    title: "",
    content: "",
    currentNote: null,
    noteIndex: 0,
    openDeleteModal: false,
    loggedIn: false
  };