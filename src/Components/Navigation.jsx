import React, {Component} from 'react';
import LoadingPage from "./LoadingPage";
import Avatars from './CoupleComponents/Avatars'
import CountingArea from "./CoupleComponents/CountingArea";
import {Router} from "@reach/router";
import BackgroundCarousel from "./Authentication/BackgroundCarousel";

class Navigation extends Component {
    render() {
        return (
            <Router>
                <LoadingPage path={'/'} password={this.props.password} isLogged={this.props.isLogged}
                             handleLogin={this.props.handleLogin}/>
                <CountingArea path={'/bee-home'} isLogged={this.props.isLogged}/>
                <BackgroundCarousel path={'/login'}/>
            </Router>
        );
    }
}

export default Navigation;