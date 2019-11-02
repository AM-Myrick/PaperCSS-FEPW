import React from "react";
import { Link } from "react-router-dom";
import "./NoteCard.css";

const cardTextSlice = window.innerWidth <= 768 ? 37 : 75;

const NoteCard = props => {
  return (
    <Link className="card" to={`/note/${props.note.id}`}>
      <div className="card-body">
        <h4 className="card-title">
          {props.note.title.length > 33
            ? props.note.title.substring(0, 33) + "..."
            : props.note.title}
        </h4>
        <p className="card-text">
          {props.note.content.length > cardTextSlice
            ? props.note.content.substring(0, cardTextSlice) + "..."
            : props.note.content}
        </p>
      </div>
    </Link>
  );
};

export default NoteCard;
