import React, {Component} from 'react';
import Navigation from "./Navigation";
import {Router, navigate} from "@reach/router";
import Navbar from './Navbar/Narbar'
class MainPage extends Component {
    constructor() {
    super()
    this.state = {
        loading: true
    }
    }


    render() {
        return (
            <div style={{
                minHeight: '100vh',
                height: '100%',
                backgroundImage: 'url(' + this.props.wallpaperImage + ')',
            }} className={'wallpaper-image '} >
            <Navigation {...this.props}/>

            </div>
        );
    }
}

export default MainPage;