import React from 'react';
import { Link } from "react-router-dom";
import "./NoteCard.css"

const NoteCard = props => {
    return (
        <Link className="card" to={`/note/${props.note.id}`}>
            <div className="card-body">
                <h4 className="card-title">{props.note.title.length > 15 ?
                    props.note.title.substring(0, 22) + "..." :
                    props.note.title}</h4>
                <p className="card-text">{props.note.content.length > 75?
                    props.note.content.substring(0, 75) + "..." :
                    props.note.content}</p>
            </div>
        </Link>
    )
}

export default NoteCard;