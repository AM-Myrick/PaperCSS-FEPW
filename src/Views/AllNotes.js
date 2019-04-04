import React, { Component } from 'react';
import NoteCard from "./NoteCard";
import './AllNotes.css';
import { CSVLink } from "react-csv";
import axios from "axios";

const URL = "https://nameless-cliffs-24621.herokuapp.com";
class AllNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: "",
            selected: 0,
            token: ""
        }
    }

    componentDidMount() {
        let token = localStorage.getItem("access_token")
        axios
            .get(`${URL}/api/notes`,
            {headers: 
                {'Authorization': token}
            })
            .then(res => {
                this.setState({notes: res.data})
            })
            .catch(error => {
              console.log(error)
            })
        console.log(this.props, this.state)
    }

    selectNote = id => this.setState({ selected: id });

    sortNotes = (e, alphaSort) => {
        e.preventDefault();
        alphaSort === true ?
        this.setState(
            { notes: 
                this.state.notes.sort(function(a, b){
                    let titleA=a.title.toLowerCase()
                    let titleB=b.title.toLowerCase()
                    if (titleA < titleB) { 
                        return -1; 
                    }
                    if (titleA > titleB) {
                        return 1;
                    }
                    return 0; 
            })}) :
            this.setState(
                { notes: 
                    this.state.notes.sort(function(b, a){
                        let titleA=a.title.toLowerCase()
                        let titleB=b.title.toLowerCase()
                        if (titleA < titleB) { 
                            return -1; 
                        }
                        if (titleA > titleB) {
                            return 1;
                        }
                        return 0; 
                })})
    }
     
    headers = [
        { label: "Title", key: "title" },
        { label: "Note Content", key: "content" },
    ];

  render() {
    return (
        this.state.notes ?
        <section>
            <div className="btn-container">
                <CSVLink download="mynotes.csv" data={this.state.notes} headers={this.headers}>
                    Download your notes!
                </CSVLink>
                <div className="dropdown">
                    <button className="dropbtn">Sort Options</button>
                    <div className="dropdown-content">
                        <div onClick={(e) => this.sortNotes(e, true)}>A-Z</div>
                        <div onClick={(e) => this.sortNotes(e, false)}>Z-A</div>
                    </div>
                </div>
            </div>
            <h2>Your Notes:</h2>
            <div className="notes">
                {this.state.notes.map(note => {
                    return <NoteCard key={note.id} note={note} />
                })}
            </div>
        </section> :
        <h3>Your Notes are loading...</h3>
    )
  }
}

export default AllNotes;