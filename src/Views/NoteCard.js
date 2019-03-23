import React from 'react';
import { Route, Link } from "react-router-dom";
import "./NoteCard.css"

const NoteCard = props => {
    return (
        <Link class="card" to={`/note/${props.note.id}`}>
            {/* <div className="notecard">
                <h3>{props.note.title}</h3>
                <p>{props.note.textBody}</p>
            </div> */}
            <div class="card-body">
                <h4 class="card-title">{props.note.title.length > 15 ?
                    props.note.title.substring(0, 10) + "..." :
                    props.note.title}</h4>
                <p class="card-text">{props.note.content.length > 75?
                    props.note.textBody.substring(0, 75) + "..." :
                    props.note.textBody}</p>
            </div>
        </Link>
    )
}

export default NoteCard;