import React, {Component} from 'react';
import LoadingPage from "./LoadingPage";
import Avatars from './CoupleComponents/Avatars'
import CountingArea from "./CoupleComponents/CountingArea";
import {Router} from "@reach/router";
import BackgroundCarousel from "./Authentication/BackgroundCarousel";
import Memories from "./CoupleComponents/Memory/Memories";
import CardDeckContainer from "./CoupleComponents/ImagePicking/cardDeckContainer";

class Navigation extends Component {

    render() {

        return (
            <Router>
                <LoadingPage path={'/'} password={this.props.password} isLogged={this.props.isLogged}
                             handleLogin={this.props.handleLogin}/>
                <CountingArea path={'/bee-home'} isLogged={this.props.isLogged}
                              handlePostImage={this.props.handlePostImage}
                              handleStorageImages={this.props.handleStorageImages} nhiImage={this.props.nhiImage}
                              baoImage={this.props.baoImage} handlePostNote={this.props.handlePostNote}
                              notes={this.props.notes} handleFormatDate={this.props.handleFormatDate}
                />
                <BackgroundCarousel path={'/login'}/>
                <Memories path={'/our-story'} handlePostMemoryData={this.props.handlePostMemoryData}
                          handleStorageMemoryImages={this.props.handleStorageMemoryImages}
                          memoryData={this.props.memoryData} memoryImageArr={this.props.memoryImageArr}/>
                <CardDeckContainer path={'/images'}
                                   cards={this.props.tarotImages}/>
            </Router>
        );
    }
}

export default Navigation;