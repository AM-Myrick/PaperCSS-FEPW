import React from "react";
import { Link } from "react-router-dom";
import "./NoteCard.css";
import { NoteCardProps } from "../../Models/Props";

const NoteCard: React.FC<NoteCardProps> = ({
  note: { id, title, content }
}) => {
  const cardTextSlice = window.innerWidth <= 768 ? 37 : 75;
  const titleText = title.length > 33 ? title.substring(0, 33) + "..." : title;
  const contentText =
    content.length > cardTextSlice
      ? content.substring(0, cardTextSlice) + "..."
      : content;
      
  return (
    <Link className="card" to={`/note/${id}`}>
      <div className="card-body">
        <h4 className="card-title">{titleText}</h4>
        <p className="card-text">{contentText}</p>
      </div>
    </Link>
  );
};

export default NoteCard;
