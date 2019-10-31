import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import "./Navigation.css"


export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
          width: window.innerWidth
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWidth)
    }

    updateWidth = () => {
        this.setState({ width: window.innerWidth })
    }

    render() {
        return (
            this.state.width >= 1000 ?
                <nav>
                    <h1><Link to="/">Paper Notes</Link></h1>
                    <NavLinks width={this.state.width} closeMenu={this.props.closeMenu} showRegisterModal={this.props.showRegisterModal}
            showLoginModal={this.props.showLoginModal}/>
                </nav> :
                <nav className="fixed">
                    <h1><Link to="/">Paper Notes</Link></h1>
                    <div className="collapsible">
                        <input id="collapsible1" type="checkbox" name="collapsible1"/>
                        <button>
                        <label htmlFor="collapsible1">
                            <div className="bar1"></div>
                            <div className="bar2"></div>
                            <div className="bar3"></div>
                        </label>
                        </button>
                        <NavLinks width={this.state.width} closeMenu={this.props.closeMenu} showRegisterModal={this.props.showRegisterModal}
            showLoginModal={this.props.showLoginModal}/>
                    </div>
                </nav>
        )
    }
}