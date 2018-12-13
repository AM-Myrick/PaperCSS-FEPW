import React, { Component } from 'react';
import axios from "axios";
import "./NewNote.css";

const token = localStorage.getItem("access_token");
axios.defaults.baseURL = 'https://nameless-cliffs-24621.herokuapp.com/'
axios.defaults.headers.common = {'Authorization': token}
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
            .post("api/notes/", this.state)
            .then(res => this.props.history.push('/all-notes'))
            .catch(error => console.log(error));
    }

    changeHandler = e => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }

  render() {
    return (
        <section className="new-note">
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
            <div onClick={this.addNote}>Save</div>
            </form>
        </section>
    )
  }
}