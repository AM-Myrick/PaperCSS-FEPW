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
                    <Link to="/all-notes"><h1>Paper Notes</h1></Link>
                    <NavLinks width={this.state.width} closeMenu={this.props.closeMenu}/>
                </nav> :
                <nav className="fixed">
                    <Link to="/all-notes"><h1>Paper Notes</h1></Link>
                    <div className="collapsible">
                        <input id="collapsible1" type="checkbox" name="collapsible1"/>
                        <button>
                        <label htmlFor="collapsible1">
                            <div className="bar1"></div>
                            <div className="bar2"></div>
                            <div className="bar3"></div>
                        </label>
                        </button>
                        <NavLinks width={this.state.width} closeMenu={this.props.closeMenu}/>
                    </div>
                </nav>
        )
    }
}