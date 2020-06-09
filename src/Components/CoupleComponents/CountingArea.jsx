import React, {Component} from 'react';
import Avatars from "./Avatars";
import CountingDateTime from "./CountingDateTimeArea/CountingDateTime";
import CoupleName from "./coupleName";
class CountingArea extends Component {
    render() {
        return (
            this.props.isLogged || localStorage.getItem('isLogged') === 'true' ?
                <div className={'mt-4'}>
                    <br/>
                    <br/>
                    <CountingDateTime handlePostImage={this.props.handlePostImage}
                                      handleStorageImages={this.props.handleStorageImages} notes={this.props.notes}
                                      handlePostMemoryData={this.props.handlePostMemoryData}/>
                    <br/>
                    <Avatars handlePostImage={this.props.handlePostImage}
                             handleStorageImages={this.props.handleStorageImages} nhiImage={this.props.nhiImage}
                             baoImage={this.props.baoImage} handlePostNote={this.props.handlePostNote}
                             handleFormatDate={this.props.handleFormatDate} />
                    <CoupleName/>

                </div> : null
        );
    }
}

export default CountingArea;