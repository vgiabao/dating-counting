import React, {Component} from 'react';
import LoadingPage from "./LoadingPage";
import CountingArea from "./CoupleComponents/CountingArea";
import {Router} from "@reach/router";
import BackgroundCarousel from "./Authentication/BackgroundCarousel";
import Memories from "./CoupleComponents/Memory/Memories";
import NewFeed from './CoupleComponents/newFeed/newFeed'
class Navigation extends Component {
    render() {

        return (
            <Router>
                <LoadingPage path={'/'} password={this.props.password} isLogged={this.props.isLogged}
                             handleLogin={this.props.handleLogin} handlerGender={this.props.handlerGender}/>
                <CountingArea path={'/bee-home'} isLogged={this.props.isLogged} logoutHandler={this.props.logoutHandler}
                              handlePostImage={this.props.handlePostImage}
                              handleStorageImages={this.props.handleStorageImages} nhiImage={this.props.nhiImage}
                              baoImage={this.props.baoImage} handlePostNote={this.props.handlePostNote}
                              notes={this.props.notes} handleFormatDate={this.props.handleFormatDate}
                              owlImages={this.props.owlImages}
                />
                <BackgroundCarousel path={'/login'}/>
                <Memories path={'/our-story'} handlePostMemoryData={this.props.handlePostMemoryData}
                          handleStorageMemoryImages={this.props.handleStorageMemoryImages}
                          memoryData={this.props.memoryData} memoryImageArr={this.props.memoryImageArr}/>
                <NewFeed path={'/new-feed'} {...this.props} />
                <NewFeed path={'/album'} {...this.props} />
            </Router>
        );
    }
}

export default Navigation;