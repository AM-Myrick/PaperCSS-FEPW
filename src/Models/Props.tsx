import { MouseEvent, FormEvent, RefObject } from "react";
import { History } from "history";
import { RouteComponentProps } from "react-router";
import Note from "./Note";

interface RouteParams {
  id?: string;
}
export interface AppProps extends RouteComponentProps<RouteParams> {
  closeMenu: () => void;
}

export interface NavProps extends AppProps {
  showRegisterModal: () => void;
  showLoginModal: () => void;
}

export interface NavLinksProps {
  width: number;
  closeMenu: () => void;
  showRegisterModal: () => void;
  showLoginModal: () => void;
}

export type ModalType = "login" | "register" | "";

export interface ModalProps {
  showModal: boolean;
  modalVersion: ModalType;
  closeMenu: () => void;
}

export interface NoteCardProps {
  key?: number | string;
  note: Note;
}

export interface DeleteModalProps {
  history: History;
  note: Note;
  deleteToggle: (e: MouseEvent<HTMLDivElement>) => void;
  noteIndex: number | undefined;
}

export interface NotePreviewProps {
  note: Note;
  closeMenu: () => void;
  updateNote: (e: MouseEvent<HTMLButtonElement, MouseEvent> | FormEvent<HTMLFormElement>) => void;
  previewHandler: () => void;
}

export interface ShowMoreButtonProps {
  clickHandler: () => void;
  value: string;
  classes: string;
}