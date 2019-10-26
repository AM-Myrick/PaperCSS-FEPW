import React from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import "./SingleNoteView.css"

export default class SingleNoteView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          note: 0,
          delete: false
        };
      }

      componentDidMount() {
        const id = this.props.match.params.id;
        this.fetchNote(id);
      }

       fetchNote = id => {
        axios
          .get(`https://nameless-cliffs-24621.herokuapp.com/api/notes/${id}`)
          .then(res => { 
            this.setState({ note: res.data }
          )
            })
          .catch(err => console.log(err));
      }

      deleteToggle = e => {
          e.preventDefault();
          this.props.closeMenu();
          this.setState({delete: !this.state.delete})
      }

      deleteNote = e => {
          e.preventDefault();
          axios
            .delete(`https://nameless-cliffs-24621.herokuapp.com/api/notes/${this.state.note.id}`)
            .then(res => this.props.history.push("/"))
            .catch(err => console.log(err))
      }

    render() {
        return (
            this.state.note === 0 ? 
                <div className="single-note">
                    <p>Loading...</p>
                </div> :
            this.state.delete ? 
                <div className="single-note" onClick={(e) => this.deleteToggle(e)}>
                    <div className="link-wrapper">
                        <Link to={`/edit/${this.state.note.id}`}>edit</Link>
                        <p onClick={this.deleteToggle}>delete</p>
                    </div>
                    <h3>{this.state.note.title}</h3>
                    <p>{this.state.note.content}</p>
                    <div className="delete-modal">
                        <div className="delete-menu">
                            <p>Are you sure you want to delete this note?</p>
                            <div className="cancel" onClick={this.deleteToggle}>Cancel</div>
                            <div className="delete" onClick={this.deleteNote}>Delete</div>
                        </div>
                    </div>
                </div> :
            <div className="single-note" onClick={() => this.props.closeMenu()}>
                <div className="link-wrapper">
                    <Link to={`/edit/${this.state.note.id}`}>edit</Link>
                    <p onClick={(e) => this.deleteToggle(e)}>delete</p>
                </div>
                <h3>{this.state.note.title}</h3>
                <p>{this.state.note.content}</p>
            </div>
        )
    }
}