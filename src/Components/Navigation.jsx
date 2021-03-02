import React, {Component} from 'react';
import LoadingPage from "./LoadingPage";
import CountingArea from "./CoupleComponents/CountingArea";
import {Router} from "@reach/router";
import BackgroundCarousel from "./Authentication/BackgroundCarousel";
import Memories from "./CoupleComponents/Memory/Memories";
import NewFeed from './CoupleComponents/newFeed/newFeed'
import AlbumPage from "./CoupleComponents/Albums/AlbumPage";
class Navigation extends Component {
    render() {

        return (
            <Router>
                <LoadingPage path={'/'} password={this.props.password} isLogged={this.props.isLogged}
                             handleLogin={this.props.handleLogin} handlerGender={this.props.handlerGender} register={this.props.handleRegister}/>
                <CountingArea path={'/bee-home'} isLogged={this.props.isLogged} logoutHandler={this.props.logoutHandler}
                              handlePostImage={this.props.handlePostImage}
                              handleStorageImages={this.props.handleStorageImages} huyenImage={this.props.huyenImage}
                              baoImage={this.props.baoImage} handlePostNote={this.props.handlePostNote}
                              notes={this.props.notes} handleFormatDate={this.props.handleFormatDate}
                              owlImages={this.props.owlImages}
                />
                <BackgroundCarousel path={'/login'}/>
                <Memories path={'/our-story'} handlePostMemoryData={this.props.handlePostMemoryData}
                          handleStorageMemoryImages={this.props.handleStorageMemoryImages}
                          memoryData={this.props.memoryData} memoryImageArr={this.props.memoryImageArr}/>
                <NewFeed path={'/new-feed'} {...this.props} />
                <AlbumPage path={'/album'} {...this.props} />
            </Router>
        );
    }
}

export default Navigation;
