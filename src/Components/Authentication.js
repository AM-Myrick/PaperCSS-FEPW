import React from "react";
import axios from "axios";
import Login from "./Login.js";

const token = localStorage.getItem("access_token");
axios.defaults.baseURL = 'https://nameless-cliffs-24621.herokuapp.com/'
axios.defaults.headers.common = {'Authorization': token}

const Authenticate = App =>
  class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          loggedIn: false,
          notes: ""
        };
      }

    //   triggerOnLogin = username => {
    //     if (username) {
    //       this.setState(
    //         {
    //           loggedIn: true,
    //           username: username,
    //         },
    //         () => {
    //           localStorage.setItem("loggedIn", this.state.loggedIn);
    //           localStorage.setItem("username", this.state.username);
              
    //         }
    //       )
    //     }
    //   }

      componentDidMount() {
        // localStorage.getItem("loggedIn") !== null ? this.setState({loggedIn: true}) : this.setState({loggedIn: false});
        axios
            .get("api/notes")
            .then(res => {
                console.log(res);
                this.setState({loggedIn: true, notes: res.data})
            })
            .catch(error => {
              console.log(error)
              setInterval(() => this.props.history.push('/all-notes'), 250);
            })
     }

      render() {
        return this.state.loggedIn === true ? (
            <App notes={this.state.notes} />
        ) : (
          <Login />
        );
      }
  };

export default Authenticate;