import React, {Component} from 'react';
import Navigation from "./Navigation";
import {Router, navigate} from "@reach/router";

class MainPage extends Component {
    constructor() {
    super()
    this.state = {
        loading: true
    }
    }


    render() {
        return (
            <div>
            <Navigation password={this.props.password} isLogged={this.props.isLogged} handleLogin={this.props.handleLogin}/>

            </div>
        );
    }
}

export default MainPage;