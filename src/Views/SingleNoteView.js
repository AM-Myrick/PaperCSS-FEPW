import React from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import "./SingleNoteView.css"

const token = localStorage.getItem("access_token");

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
        let token = localStorage.getItem("access_token")
        axios
          .get(`https://nameless-cliffs-24621.herokuapp.com/api/notes/${id}`,
          {headers: 
              {'Authorization': token}
          })
          .then(res => { 
            this.setState({ note: res.data }
          )
            })
          .catch(err => console.log(err));
      }

      deleteToggle = e => {
          e.preventDefault();
          this.setState({delete: !this.state.delete})
      }

      deleteNote = e => {
          e.preventDefault();
          axios
            .delete(`https://nameless-cliffs-24621.herokuapp.com/api/notes/${this.state.note.id}`,
            {headers: 
                {'Authorization': token}
            })
            .then(res => this.props.history.push("/all-notes"))
            .catch(err => console.log(err))
      }

    render() {
        return (
            this.state.note === 0 ? 
                <div className="single-note">
                    <p>Loading...</p>
                </div> :
            this.state.delete ? 
                <div className="single-note">
                    <div className="link-wrapper">
                        <Link to={`/edit/${this.state.note.id}`}>edit</Link>
                        <a onClick={this.deleteToggle}>delete</a>
                    </div>
                    <h3>{this.state.note.title}</h3>
                    <p>{this.state.note.content}</p>
                    <div className="delete-modal">
                        <div className="delete-menu">
                            <p>Are you sure you want to delete this?</p>
                            <a className="delete" onClick={this.deleteNote}>Delete</a>
                            <a className="cancel" onClick={this.deleteToggle}>No</a>
                        </div>
                    </div>
                </div> :
            <div className="single-note">
                <div className="link-wrapper">
                    <Link to={`/edit/${this.state.note.id}`}>edit</Link>
                    <a onClick={this.deleteToggle}>delete</a>
                </div>
                <h3>{this.state.note.title}</h3>
                <p>{this.state.note.content}</p>
            </div>
        )
    }
}