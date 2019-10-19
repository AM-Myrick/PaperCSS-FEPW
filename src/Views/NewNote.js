import React, { Component } from 'react';
import axios from "axios";
import "./NewNote.css";

export default class NewNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            id: ""
        }
    }

    addNote = e => {
        e.preventDefault();
        axios
            .post("https://nameless-cliffs-24621.herokuapp.com/api/notes/", this.state)
            .then(res => this.props.history.push('/all-notes'))
            .catch(error => console.log(error));
    }

    changeHandler = e => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }

  render() {
    return (
        <section className="new-note" onClick={() => this.props.closeMenu()}>
            <h2>Create New Note:</h2>
            <form onSubmit={this.addNote}>
            <input 
                onChange={this.changeHandler}
                type="text" 
                placeholder="Note Title"
                name="title"
                value={this.state.title}
                className="new-title"
                >
            </input>
            <textarea 
                onChange={this.changeHandler}
                type="text" 
                placeholder="Note Content"
                name="content"
                value={this.state.content}
                className="new-textBody"
                >
            </textarea>
            <div className="save" onClick={this.addNote}>Save</div>
            </form>
        </section>
    )
  }
}